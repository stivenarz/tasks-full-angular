import { Component } from '@angular/core';
// import { tasks } from '../../database';
import { TasksConectionService } from '../tasks-conection.service'
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

  constructor(private TasksConection: TasksConectionService) {

  }

  ngOnInit(): void {

    this.index()

  }

  // VARS DECLARATION ----------------------------------------------------------------------------------------------------------------------------------------

  tasks: any = [];
  task: any = {
    id: null,
    title: '',
    description: '',
    done: null
  };
  alert: any = {};
  modal: boolean = false;
  timer: any = null;
  editTask: any;
  action: string = '';
  invalidForm: any = {};
  animationKey: any = null;
  serverStatus: boolean = false

  public index() {
    this.TasksConection.index().subscribe(
      (res) => {
        if (res.status === 'ok') {
          res.data.forEach((item: any, index: any) => {
            setTimeout(() => {
              this.tasks.push(item)
            }, index * 100);
          });
          // this.tasks = res.data
          this.serverStatus = true
        } else {
          this.serverStatus = false
        }
      }
    )
  }
  public create() {
    this.openModal(true);
    this.action = 'Add';
    this.resetAlert();
    this.resetTask();
  }

  public save(task: any): void {
    if (this.validate()) {
      this.TasksConection.save(this.task).subscribe(
        (res) => {
          if (res.status === 'ok') {
            this.tasks.push(res.data)
            this.resetTask();
            this.setAlert({
              status: 'success',
              msg: res.msg
            });
            document.getElementById('title')?.focus()
          } else if (res.status === 'error') {
            this.setAlert({
              status: 'error',
              msg: res.msg
            });
          }
        }
      )
    } else {
      this.setAlert({
        status: 'error',
        msg: 'Fill in all fields'
      });
    }
  }

  public edit(task: any = {}) {
    this.action = 'Update';
    this.task = { ...task };
    this.resetAlert();
    this.openModal(true);
  }

  public update(task: any = {}) {
    if (this.validate()) {
      this.TasksConection.update(task).subscribe(
        (res) => {
          if (res.status === 'ok') {
            this.tasks = this.tasks.map(change);
            this.setAlert({
              status: 'success',
              msg: res.msg
            });
          } else {
            this.setAlert({
              status: 'error',
              msg: res.msg
            });
          }
        }
      )
    } else {
      this.setAlert({
        status: 'error',
        msg: 'Fill in all fields'
      });
    }

    function change(item: any) {
      if (item._id != task._id) {
        return item
      } else {
        return task
      }
    }
  }

  public delete(task: any = {}) {
    if (confirm(`Sure delete task: ${task.title}?`)) {
      this.TasksConection.delete(task).subscribe(
        (res) => {
          if (res.status === 'ok') {
            this.animationKey = res.data._id
            setTimeout(() => {
              this.tasks = this.tasks.filter(kill)
              this.animationKey = null
            }, 500);
            this.setAlert({
              status: 'success',
              msg: res.msg
            });
          } else {
            this.setAlert({
              status: 'error',
              msg: 'Error at delete task'
            });
          }
        }
      )

      function kill(item: any) {
        if (item._id != task._id) {
          return item
        }
      }
    }

  }

  public toggleDone(task: any) {
    this.TasksConection.toggleDone(task).subscribe(
      (res) => {
        if (res.status === 'ok') {
          this.tasks = this.tasks.map(change);
        }
      }
    )

    function change(item: any) {
      if (task._id === item._id) {
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
    }, 5);
  }

  public routerForm(task: any) {
    if (this.action === 'Add') {
      this.save(task)
    } else if (this.action === 'Update') {
      this.update(task)
    }
  }

  private validate() {
    this.invalidForm = {};
    if (this.task.title.trim() == '') {
      this.invalidForm.title = 'title';
    }
    if (this.task.description.trim() == '') {
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

  private resetTask() {
    this.task = {
      id: null,
      title: '',
      description: '',
      done: null
    };
  }

  private resetAlert() {
    this.alert = {}
  }

}
