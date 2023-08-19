import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Alert } from './alert/alert.component';
import { Tasks } from './tasks/tasks.component';
import { TaskForm } from './task-form/task-form.component';
import { TaskView } from './task-view/task-view.component';

@NgModule({
  declarations: [
    AppComponent,
    Tasks,
    TaskForm,
    Alert,
    TaskView,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { 

}
