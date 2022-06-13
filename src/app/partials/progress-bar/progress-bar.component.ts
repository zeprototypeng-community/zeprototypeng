import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProgressBarService } from './progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  // value: number = 0;
  // max: number = 100;
  // period = 10;
  // speed = 200;
  // intervalFunction: any;
  _destroy$ = new Subject();
  display: boolean;
  constructor(private progressService: ProgressBarService) { }

  ngOnInit(): void {
    this.progressService
      .progress
      .pipe(takeUntil(this._destroy$))
      .subscribe((result) => {
        this.display = result;
        // console.log(result, this.intervalFunction)
        // if (result == true) {
        //   this.intervalFunction = setInterval(() => {
        //     this.value = this.value + this.period;
        //     if (this.value >= this.max) {
        //       this.value = 0;
        //     }
        //   }, this.speed);
        // } else {
        //   clearInterval(this.intervalFunction);
        //   this.value = 0;
        // }
      })
  }

  ngOnDestroy(): void {
    this._destroy$.next('');
  }
}
