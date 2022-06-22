<h1 align="center">
ZePrototype NG
</h1>
<div align="center">

An Angular admin template
</div>

# Prerequisites

* [Node.js](https://nodejs.org/en/)
* [Angular v13](https://angular.io/)
* [Clarity Design v13](https://angular.clarity.design/)

# Installation

Open the command prompt at the root of the project and type the following command.
> npm install

# Configuration

Edit environment files `/environments/environment.ts` and `/environments/environment.prod.ts` in relation to your development and deployment environment.

# Quick Start

Run the application and enjoy ☻:
> ng serve

# Usage

## Authentication page

Enter username and password to login. You can adjust the authentication system as you wish.

## Components

Create your components in module `main`
> ng generate component main/mycomponentname

## Application routes configuration

Add a property to `appRoutes` const variable in `/src/app/application/routing/app-routes.ts` file :
```
export const appRoutes = {
  ...
  myroute: { path: 'my-route-path', label: 'My route label' }
};
```

Append route configuration to `children` property of first `Route` object in `/src/app/main/main-routing.module.ts` file:
```
...
{
    path: appRoutes.myroute.path, // the property that you added to the constant variable
    component: MyComponent, // the generated component
    data: { breadcrumb: appRoutes.myroute.label } //Label to display
}
```

Your component is now accessible through the left sidebar.

## Generate a form

Open `/src/app/application/forms/forms.ts` file, add these lines to `formIds` and `Iform` const variables.
```
...
export const formIds = {
    ...
    myFormId: 7 // Your form id must be unique
}
...
export const forms: Iform[] = [
    ...
    {
        id: formIds.myFormId,
        controls: [
            {
                // refer to the 'controls' property of the object whose 'id' property value is equal to 'formIds.testFormId'
            }
        ]
    },
]
```

Now, edit your component like this:

`/src/app/main/my-component/my-component.component.ts`
```
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { formIds } from 'src/app/application/forms/forms';
import { Iform } from 'src/app/core/form-module/dynamic-form/dynamic-form.component';
import { FormService } from 'src/app/core/form-module/services/form.service';
import { UiNotificationService, UIStateStatusCode } from 'src/app/partials/ui-notification/ui-notification.service';
...
export class MyComponent implements OnInit {

    form: Iform;
    formGroup: FormGroup;

    constructor(private uiState: UiNotificationService, private client: HttpRequestService, private formService: FormService) { }
    
    ngOnInit(): void {
        this.buildForm();
    }

    async buildForm() {
        this.form = await this.formService.getForm(formIds.myFormId);
        this.formGroup = this.formService.getFormGroup(this.form.controls);
    }
}
```

`/src/app/main/my-component/my-component.component.html`
```
<form [formGroup]="formGroup" *ngIf="formGroup">
    <app-dynamic-form [formGroup]="formGroup" [form]="form"></app-dynamic-form>
</form>
```

## API routes configuration

Add a property to `minRoutes` and `apiRoutes` const variables in `/src/app/application/routing/app-routes.ts` file :
```
export const minRoutes = {
  ...
  my_min_api_route: 'my-api-route-prefix-name'
};

export const apiRoutes = {
  ...
  my_api_route: environment.APP_SERVER_HOST + environment.URLPART1 + minRoutes.my_min_api_route
};
```

## List, Create, Update and Delete data

Create a `.ts` file under the directory `/src/app/application/models/` as a model.
```
export class MyModel {
    public id: number = undefined;
    public label: string = undefined;
}
```

Import model into component and enjoy the result.

`/src/app/main/my-component/my-component.component.ts`
```
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Subject, takeUntil } from 'rxjs';
import { formIds } from 'src/app/application/forms/forms';
import { MyModel } from 'src/app/application/models/MyModel';
import { responsesMessages } from 'src/app/application/response/messages';
import { PaginateResponse, getResponseState, getResponseData, getResponseCode } from 'src/app/application/response/response';
import { apiRoutes } from 'src/app/application/routing/api-routes';
import { Iform } from 'src/app/core/form-module/dynamic-form/dynamic-form.component';
import { FormService } from 'src/app/core/form-module/services/form.service';
import { HttpRequestService } from 'src/app/core/http/http-request.service';
import { UiNotificationService, UIStateStatusCode } from 'src/app/partials/ui-notification/ui-notification.service';
import { getFiltersFromDatagrid } from 'src/app/core/util/datagrid-util';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponent implements OnInit {

  _destroy$ = new Subject();

  form : Iform;
  formGroup : FormGroup;

  url = apiRoutes.my_api_route;
  singleData: MyModel;
  data: PaginateResponse = new PaginateResponse(new MyModel);
  initialGridState: ClrDatagridStateInterface = { page: { current: 1, size: 10 } };
  loading = true;
  updating = false;
  openModal = false;

  constructor(private uiState: UiNotificationService, private client: HttpRequestService, private formService: FormService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  async buildForm() {
    this.form = await this.formService.getForm(formIds.myFormId);
    this.formGroup = this.formService.getFormGroup(this.form.controls);
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
      this.singleData = new MyModel();
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
```

`/src/app/main/my-component/my-component.component.html`
```
<form [formGroup]="formGroup" *ngIf="formGroup">
    <app-dynamic-form [formGroup]="formGroup" [form]="form"></app-dynamic-form>

    <button class="btn btn-sm btn-success" type="submit" *ngIf="updating == false" [disabled]="formGroup.invalid">
        SAVE
    </button>
    <button class="btn btn-sm btn-success" type="button" *ngIf="updating == true" (click)="onUpdate(formGroup)" [disabled]="formGroup.invalid">
        EDIT
    </button>
    <button class="btn btn-sm btn-danger" type="button" *ngIf="updating == true" (click)="onCancel()">
        CANCEL
    </button>
</form>

<clr-datagrid (clrDgRefresh)="onDgRefresh($event)" [clrDgLoading]="loading">
    <clr-dg-column>ID</clr-dg-column>
    <clr-dg-column>Label</clr-dg-column>

    <clr-dg-row *ngFor="let item of data.data">
        <clr-dg-cell>{{item.id}}</clr-dg-cell>
        <clr-dg-cell>{{item.label}}</clr-dg-cell>
        <clr-dg-action-overflow>
            <button class="action-item" (click)="onEdit(item.id)">MODIFIER</button>
            <button class="action-item" (click)="onDeleteAttempt(item.id)">SUPPRIMER</button>
        </clr-dg-action-overflow>
    </clr-dg-row>

    <clr-dg-footer>
        <clr-dg-pagination #pagination [clrDgPageSize]="initialGridState.page.size" [clrDgTotalItems]="data?.total">
            <clr-dg-page-size [clrPageSizeOptions]="[10, 20, 30]"></clr-dg-page-size>
            {{ pagination.firstItem + 1 }} - {{ pagination.lastItem + 1 }} of {{ pagination.totalItems }} elements
        </clr-dg-pagination>
    </clr-dg-footer>
</clr-datagrid>

<clr-modal [(clrModalOpen)]="openModal">
    <h3 class="modal-title">DELETE</h3>
    <div class="modal-body">
      <p>Do you want to delete?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-sm btn-outline" (click)="openModal = false">CANCEL</button>
      <button type="button" class="btn btn-sm btn-danger" (click)="onDelete(singleData.id)">YES, CONFIRM</button>
    </div>
  </clr-modal>
```