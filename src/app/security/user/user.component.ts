import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Subject, takeUntil } from 'rxjs';
import { formIds } from 'src/app/application/forms/forms';
import { User } from 'src/app/application/models/user';
import { responsesMessages } from 'src/app/application/response/messages';
import { getResponseState, getResponseData, getResponseCode, PaginateResponse } from 'src/app/application/response/response';
import { apiRoutes } from 'src/app/application/routing/api-routes';
import { Iform } from 'src/app/core/form-module/dynamic-form/dynamic-form.component';
import { FormService } from 'src/app/core/form-module/services/form.service';
import { HttpRequestService } from 'src/app/core/http/http-request.service';
import { UiNotificationService, UIStateStatusCode } from 'src/app/partials/ui-notification/ui-notification.service';
import { getFiltersFromDatagrid } from 'src/app/core/util/datagrid-util';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  _destroy$ = new Subject();

  form: Iform;
  formGroup: FormGroup;

  url = apiRoutes.users;
  singleData: User;
  data: PaginateResponse = new PaginateResponse(new User);
  initialGridState: ClrDatagridStateInterface = { page: { current: 1, size: 10 } };
  loading = true;
  updating = false;
  openModal = false;

  constructor(private uiState: UiNotificationService, private client: HttpRequestService, private formService: FormService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * get data 
   * 
   * @param param 
   */
  getData(param?: string) {
    this.loading = true;
    this.uiState.startAction();
    param = param ? param : getFiltersFromDatagrid(this.initialGridState);
    this.client.get(this.url + '?' + param)
      .pipe(takeUntil(this._destroy$))
      .subscribe((result) => {
        if (getResponseState(result)) {
          this.data = getResponseData(result);
          this.uiState.endAction();
        } else {
          this.uiState.endAction(getResponseCode(result), responsesMessages.FAILED);
        }

        this.loading = false;
      })
  }

  async buildForm() {
    this.form = await this.formService.getForm(formIds.userFormId);
    this.formGroup = this.formService.getFormGroup(this.form.controls);
  }

  /**
   * submit form data
   * 
   * @param param 
   */
  onSubmit(param: FormGroup) {
    this.uiState.startAction();
    let dataToSend = param.getRawValue();
    this.client.post(this.url, dataToSend)
    .pipe(takeUntil(this._destroy$))
    .subscribe((result) => {
      if (getResponseState(result)) {
        this.formGroup.reset();
        this.getData();
        this.uiState.endAction(UIStateStatusCode.CREATED, responsesMessages.SUCCESS);
      } else {
        this.uiState.endAction(getResponseCode(result), responsesMessages.FAILED);
      }
    });
  }

  /**
   * set form with values from the ressource id
   * 
   * @param id 
   */
  onEdit(id: number) {
    this.client.get(this.url + '/' + id)
    .pipe(takeUntil(this._destroy$))
    .subscribe((result) => {
      if (getResponseState(result)) {
        this.singleData = getResponseData(result);
        Object.keys(this.singleData).forEach((v, i) => {
          this.formGroup.controls?.[v]?.setValue(this.singleData?.[v]);
          this.updating = true;
        })
        this.uiState.endAction(UIStateStatusCode.CREATED, responsesMessages.SUCCESS);
      } else {
        this.uiState.endAction(getResponseCode(result), responsesMessages.FAILED);
      }
    });
  }

  /**
   * cancel form editing
   */
  onCancel() {
    this.formGroup.reset();
    this.updating = false;
  }

  /**
   * update data
   * 
   * @param param 
   */
  onUpdate(param: FormGroup) {
    this.uiState.startAction();
    let dataToSend = param.getRawValue();
    delete dataToSend.password;
    delete dataToSend.password_confirmation;
    this.client.put(this.url + '/' + this.singleData.id, dataToSend)
    .pipe(takeUntil(this._destroy$))
    .subscribe((result) => {
      if (getResponseState(result)) {
        this.formGroup.reset();
        this.updating = false;
        this.getData();
        this.uiState.endAction(UIStateStatusCode.OK, responsesMessages.SUCCESS);
      } else {
        this.uiState.endAction(getResponseCode(result), responsesMessages.FAILED);
      }
    });
  }

  /**
   * attempt to delete data
   */
  onDeleteAttempt(id: number) {
    if (!this.singleData) {
      this.singleData = new User();
    }
    this.singleData.id = id;
    this.openModal = true;
  }

  /**
   * delete data by the given resource id
   * 
   * @param id 
   */
  onDelete(id: number) {
    this.uiState.startAction();
    this.client.delete(this.url + '/' + id)
    .pipe(takeUntil(this._destroy$))
    .subscribe((result) => {
      if (getResponseState(result)) {
        this.getData();
        this.uiState.endAction(UIStateStatusCode.OK, responsesMessages.SUCCESS);
      } else {
        this.uiState.endAction(getResponseCode(result), responsesMessages.FAILED);
      }
      this.openModal = false;
    });
  }

  /**
   * on datagrid refresh event
   * 
   * @param state 
   */
  onDgRefresh = (state: ClrDatagridStateInterface) => {
    this.getData(getFiltersFromDatagrid(state))
  }

  ngOnDestroy(): void {
    this._destroy$.next('');
  }
}
