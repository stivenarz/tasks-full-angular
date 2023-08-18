import { Component, Input } from '@angular/core';

@Component({
  selector: 'Alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class Alert {
  @Input() alert: any;
}
