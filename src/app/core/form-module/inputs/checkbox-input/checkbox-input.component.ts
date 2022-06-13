import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { IControl } from '../../dynamic-form/dynamic-form.component';
import { InputService } from '../../services/input.service';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss']
})
export class CheckboxInputComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() controlConfig: IControl;

  get _control() {
    return this.control as FormControl
  }

  constructor(public inputService: InputService) { }

  ngOnInit(): void {
  }

}
