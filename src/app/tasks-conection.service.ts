import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TasksConectionService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/tasks';

  index(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  show(task: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${task}`);
  }

  save(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, task);
  }

  update(task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${task._id}/update`, task);
  }

  delete(task: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${task._id}/delete`, task);
  }

  toggleDone(task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${task._id}/toggleDone`, task);
  }


}
