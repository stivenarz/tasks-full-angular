import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private valueSource = new Subject<string>();
  valueChanged$ = this.valueSource.asObservable();

  updateValue(newValue: any) {
    this.valueSource.next(newValue);
  }
}
