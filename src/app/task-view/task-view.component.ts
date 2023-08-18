import { Component, Input } from '@angular/core';
import { SharedService } from '../tasks/handler';   // IMPORTACION DEL MIDDLEWARE HANDLER
import { Tasks } from '../tasks/tasks.component';

@Component({
  selector: 'TaskView',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskView {
  
  constructor(
    private sharedService: SharedService,   // DECLARACION DE LA CONEXION CON EL MIDDLEWARE HANDLER EN TASKS
    public taskController: Tasks
    ) {

  }
      // MIDDLEWARE PARA ENVIAR DATOS ENTRE LOS DOS MODULOS
  // sendEdit(task: any) {
  //   this.sharedService.updateValue(task);
  // }

  @Input() task: any;

}
