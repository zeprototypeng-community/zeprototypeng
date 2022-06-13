import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { IControl } from '../../dynamic-form/dynamic-form.component';
import { InputService } from '../../services/input.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  @Input() control: AbstractControl;
  @Input() controlConfig: IControl;

  get _control() {
    return this.control as FormControl
  }
  constructor(public inputService: InputService) { }

  ngOnInit(): void {
  }

  isDefined(param: any) {
    return param ? param : '';
  }

  
}
