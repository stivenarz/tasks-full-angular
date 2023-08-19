import { Component, Input , ElementRef, AfterViewInit} from '@angular/core';
import { SharedService } from '../tasks/handler';
import {Tasks} from '../tasks/tasks.component'

@Component({
  selector: 'TaskForm',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskForm implements AfterViewInit {

  constructor(private sharedService: SharedService, public taskController: Tasks, public elementRef: ElementRef) {
   this.sharedService.valueChanged$.subscribe(newValue => {
      this.taskController.task = newValue;
      this.taskController.openModal();
    });

  }
  ngAfterViewInit() {
    const modalTask = this.elementRef.nativeElement.querySelector('#modalTask');
    modalTask.addEventListener('keyup', this.handleKey.bind(this));
  }
  ngOnInit(): void{
    
  }

  handleKey(event: any){
    if (event.key == 'Escape') {
      this.taskController.openModal(false)
    }
  }
}
