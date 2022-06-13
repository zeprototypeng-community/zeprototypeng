import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { TextInputComponent } from './inputs/text-input/text-input.component';
import { NumberInputComponent } from './inputs/number-input/number-input.component';
import { ClrFormsModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailInputComponent } from './inputs/email-input/email-input.component';
import { DateInputComponent } from './inputs/date-input/date-input.component';
import { PasswordInputComponent } from './inputs/password-input/password-input.component';
import { TextareaInputComponent } from './inputs/textarea-input/textarea-input.component';
import { SelectInputComponent } from './inputs/select-input/select-input.component';
import { RadioInputComponent } from './inputs/radio-input/radio-input.component';
import { FileInputComponent } from './inputs/file-input/file-input.component';
import { CheckboxInputComponent } from './inputs/checkbox-input/checkbox-input.component';
import { HiddenInputComponent } from './inputs/hidden-input/hidden-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RepeatableGroupComponent } from './inputs/repeatable-group/repeatable-group.component';


@NgModule({
  declarations: [
    DynamicFormComponent,
    TextInputComponent,
    NumberInputComponent,
    EmailInputComponent,
    DateInputComponent,
    PasswordInputComponent,
    TextareaInputComponent,
    SelectInputComponent,
    RadioInputComponent,
    FileInputComponent,
    CheckboxInputComponent,
    HiddenInputComponent,
    RepeatableGroupComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ClrFormsModule,
    NgSelectModule
  ],
  exports: [
    DynamicFormComponent,
    TextInputComponent,
    NumberInputComponent,
  ]
})
export class FormModuleModule { }
