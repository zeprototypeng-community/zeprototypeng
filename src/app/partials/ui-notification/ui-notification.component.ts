import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UiNotificationService, UIStateStatusCode } from './ui-notification.service';

@Component({
  selector: 'app-ui-notification',
  template: `
  <clr-alert *ngIf="is_display" [clrAlertClosable]="false" [clrAlertType]="alertType">
    <clr-alert-item>
        <span class="alert-text">{{message}}</span>
        <div class="alert-actions">
            <clr-icon shape="times" (click)="onClrAlertClosedChanged(true)"></clr-icon>
        </div>
    </clr-alert-item>
  </clr-alert>
  `,
  styleUrls: ['./ui-notification.component.scss']
})
export class UiNotificationComponent implements OnInit {

  alertType: string;
  message: string;
  is_display: boolean = false;
  _destroy$ = new Subject();
  constructor(private notifiyService: UiNotificationService) { }

  ngOnInit(): void {
    this.notifiyService.alert
    .pipe(takeUntil(this._destroy$))
      .subscribe((result) => {
        this.is_display = !result.state;
        if (result.state === false) {
          this.message = result.message;
          if (result.code === UIStateStatusCode.OK || result.code === UIStateStatusCode.CREATED) {
            this.alertType = 'success';
          }
          if (result.code === UIStateStatusCode.BAD) {
            this.alertType = 'warning';
          }
          if (result.code === UIStateStatusCode.ERROR) {
            this.alertType = 'warning';
          }
          if (result.code === UIStateStatusCode.ERROR) {
            this.alertType = 'warning';
          }
          if (result.code === UIStateStatusCode.INFO) {
            this.alertType = 'info';
          }
          setTimeout(() => this.onClrAlertClosedChanged(true), 5000);
        }
      })
  }

  onClrAlertClosedChanged(param: boolean) {
    this.is_display = !param;
  }

  ngOnDestroy(): void {
    this._destroy$.next('');
  }
}
