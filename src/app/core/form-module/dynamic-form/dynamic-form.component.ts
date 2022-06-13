import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { InputService } from '../services/input.service';

export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  SELECT = 'select',
  DATE = 'date',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  HIDDEN = 'hidden',
  ARRAY = 'array',
  GROUP = 'group',
}

export interface IRule {
  rule: string, // required, min, max, minlenght, maxlenght, email
  value?: any
}

export interface IItem {
  label: string;
  value: any;
  name?: string;
}

export interface IRemoteData {
  url: string;
  fields: {
    value: string;
    label: string;
    object?: string;
  };
}

export interface IControl {
  type: string | InputType,
  label: string,
  name: string,
  rules: IRule[],
  value?: any,
  index?: number,
  items?: IItem[],
  placeholder?: string,
  containerClass?: string,
  multiple?: boolean,
  patterns?: RegExp[] | string[],
  remote?: IRemoteData,
  childreen?: IControl[],
}

export interface Iform {
  id: number,
  controls: IControl[]
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  INPUT_TYPE = InputType;
  @Input() form: Iform;
  @Input() formGroup: FormGroup;
  @Input() containerClass: string;

  constructor(public inputService: InputService) { }

  ngOnInit(): void {
  }

  getFormControl(formGroup: FormGroup, formName: string): AbstractControl {
    return formGroup.get(formName);
  }

}
