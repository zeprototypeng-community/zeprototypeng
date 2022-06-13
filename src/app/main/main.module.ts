import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { DashboardRoutingModule } from './main-routing.module';
import { ClarityModule, ClrDatagridModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { TopBarComponent } from '../partials/top-bar/top-bar.component';
import { SideBarComponent } from '../partials/side-bar/side-bar.component';
import { HttpRequestInterceptorService } from '../core/http/http-request-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PermissionComponent } from '../security/permission/permission.component';
import { FormModuleModule } from '../core/form-module/form-module.module';
import { BreadcrumbComponent } from '../partials/breadcrumb/breadcrumb.component';
import { MainTitleComponent } from '../partials/main-title/main-title.component';
import { PermissionRoleComponent } from '../security/permission-role/permission-role.component';
import { PermissionUserComponent } from '../security/permission-user/permission-user.component';
import { RoleUserComponent } from '../security/role-user/role-user.component';
import { RoleComponent } from '../security/role/role.component';
import { UserComponent } from '../security/user/user.component';
import { BottomBarComponent } from '../partials/bottom-bar/bottom-bar.component';

@NgModule({
  declarations: [
    MainComponent,
    TopBarComponent,
    BottomBarComponent,
    MainTitleComponent,
    SideBarComponent,
    BreadcrumbComponent,
    UserComponent,
    RoleComponent,
    PermissionComponent,
    RoleUserComponent,
    PermissionUserComponent,
    PermissionRoleComponent,
  ],
  imports: [
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClrDatagridModule,
    ClarityModule,
    CommonModule,
    RouterModule,
    FormModuleModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptorService
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'XOF' },
    CurrencyPipe
  ]
})
export class MainModule { }
