import { Component } from '@angular/core';
import { tasks } from '../../database';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'Tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    trigger('enterState', [
      state('void', style({
        transform: 'translateX(-100%)',
        opacity: 0,
        widht: 0
      })),
      transition(':enter', [
        animate(300, style({
          transform: 'translateX(0)',
          opacity: 1,
          widht: 500
        }))
      ])
    ]),
    trigger('exitState', [
      state('visible', style({
        transform: 'translateX(0), translateY(0)',
        opacity: 1,
      })),
      state('hidden', style({
        transform: 'translateX(-100%)',
        opacity: 0,
      })),
      transition('visible <=> hidden', animate('500ms ease-out')),
    ]),
  ]

})

export class Tasks {

  constructor() {

  }

  ngOnInit(): void {

  }

  // VARS DECLARATION ----------------------------------------------------------------------------------------------------------------------------------------

  tasks: any = tasks;
  task: any = {};
  alert: any = {};
  model: any = {
    id: null,
    title: '',
    description: '',
    done: null
  };
  modal: boolean = false;
  timer: any = null;
  editTask: any;
  action: string = '';
  invalidForm: any = {};
  animationKey: any = null;

  public create() {
    this.openModal(true);
    this.action = 'Add';
    this.resetAlert();
    this.resetModel();
  }

  public save(): void {
    if (!this.validate()) {
      this.setAlert({
        status: 'error',
        msg: 'Fill in all fields'
      });
    } else {
      this.model.id = this.tasks.length + 1;
      this.tasks.push(this.model);
      this.resetModel();
      this.setAlert({
        status: 'success',
        msg: 'Task saved successfully'
      });
      document.getElementById('title')?.focus()
    }
  }

  public edit(task: any = {}) {
    this.action = 'Update';
    this.model.id = task.id;
    this.model.title = task.title;
    this.model.description = task.description;
    this.resetAlert();
    this.openModal(true);
  }

  public update(task: any = {}) {
    const taskModified = this.model;
    if (this.validate()) {
      this.tasks = this.tasks.map(change);
      this.setAlert({
        status: 'success',
        msg: 'Task updated successfully'
      });
    } else {
      this.setAlert({
        status: 'error',
        msg: 'Error at update task'
      });
    }

    function change(item: any) {
      if (item.id != taskModified.id) {
        return item
      } else {
        item.title  = taskModified.title;
        item.description  = taskModified.description;
        return item
      }
    }
  }

  public delete(task: any = {}) {
    if (confirm(`Sure delete task: ${task.title}?`)) {
      this.animationKey = task.id
      setTimeout(() => {
        this.tasks = this.tasks.filter(kill)
        this.animationKey = null
      }, 500);
      this.setAlert({
        status: 'success',
        msg: 'Task deleted successfully'
      });

      function kill(item: any) {
        if (item.id != task.id) {
          return item
        }
      }
    }

  }

  public done(task: any) {
    this.tasks = this.tasks.map(changue)

    function changue(item: any) {
      if (task.id === item.id) {
        item.done = !item.done
      }
      return item
    }
  }

  public setAlert(alert: any = {}) {
    this.alert = alert;

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.resetAlert()
    }, 3000);
  }

  public openModal(open: boolean = false) {
    if (open) {
      this.invalidForm = {};
    }
    this.modal = open;
    const focusTitle = setInterval(() => {
      const modalTitle = document.getElementById('title');
      if (modalTitle) {
        modalTitle.focus()
        clearInterval(focusTitle)
      }
    },5);
  }

  public routerForm() {
    if (this.action === 'Add') {
      this.save()
    } else if (this.action === 'Update') {
      this.update()
    }
  }

  private validate() {
    this.invalidForm = {};
    if (this.model.title.trim() == '') {
      this.invalidForm.title = 'title';
    }
    if (this.model.description.trim() == '') {
      this.invalidForm.description = 'description';
    }
    if (this.invalidForm.title) {
      document.getElementById('title')?.focus()
    } else if (this.invalidForm.description) {
      document.getElementById('description')?.focus()
    } else {
      return true
    }
    return false
  }

  private resetModel() {
    this.model = {
      id: null,
      title: '',
      description: ''
    };
  }

  private resetAlert() {
    this.alert = {}
  }

}
