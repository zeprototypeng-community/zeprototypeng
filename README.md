# Our Angular template

## Prerequisites

* [Node.js](https://nodejs.org/en/)
* [Angular](https://angular.io/)

## Installation

Open the command prompt at the root of the project and type the following command.
> npm install

## Configuration

Edit environment files `/environments/environment.ts` and `/environments/environment.prod.ts` in relation to your development and deployment environment.

## Quick Start

Run the application and enjoy ☻:
> ng serve

## Usage

### Authentication page

Enter username and password to login. You can adjust the authentication system as you wish.

### Components

Create your components in module `main`
> ng generate component main/mycomponentname

### Application routes configuration

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
    data: { breadcrumb: appRoutes.myroute.label } Label to display
}
```

Your component is now accessible through the left sidebar.

### Generate a form

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
                // refer to the `controls` property of the object whose `id` property value is equal to `formIds.testFormId`
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
    ...

    form: Iform;
    formGroup: FormGroup;

    constructor(private uiState: UiNotificationService, private client: HttpRequestService, private formService: FormService) { }
    
    ngOnInit(): void {
        this.buildForm();
    }

    async buildForm() {
        this.form = await this.formService.getForm(formIds.storeId);
        this.formGroup = this.formService.getFormGroup(this.form.controls);
    }
    ...
}
```

```
`/src/app/main/my-component/my-component.component.html`
<form [formGroup]="formGroup" *ngIf="formGroup">
    <app-dynamic-form [formGroup]="formGroup" [form]="form"></app-dynamic-form>
</form>
```

### API routes configuration

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

### List, Create, Update and Delete