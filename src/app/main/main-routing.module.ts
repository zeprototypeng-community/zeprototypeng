import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '../application/routing/app-routes';
import { AuthGuardService } from '../login/services/auth-guard.service';
import { PermissionComponent } from '../security/permission/permission.component';
import { MainComponent } from './main.component';
import { UserComponent } from '../security/user/user.component';
import { RoleComponent } from '../security/role/role.component';
import { PermissionRoleComponent } from '../security/permission-role/permission-role.component';
import { PermissionUserComponent } from '../security/permission-user/permission-user.component';
import { RoleUserComponent } from '../security/role-user/role-user.component';
import { PageNotFoundComponent } from '../partials/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canLoad: [],
    canActivateChild: [],
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: appRoutes.commonRoutes.homeRoute.path,
        canLoad: [],
        canActivate: [AuthGuardService],
        canActivateChild: [],
        data: { breadcrumb: appRoutes.commonRoutes.homeRoute.label },
      },
      {
        path: appRoutes.users.path,
        component: UserComponent,
        data: { breadcrumb: appRoutes.users.label },
        canActivate: []
      },
      {
        path: appRoutes.roles.path,
        component: RoleComponent,
        data: { breadcrumb: appRoutes.roles.label },
        canActivate: []
      },
      {
        path: appRoutes.permissions.path,
        component: PermissionComponent,
        data: { breadcrumb: appRoutes.permissions.label },
        canActivate: []
      },
      {
        path: appRoutes.permissions_role.path,
        component: PermissionRoleComponent,
        data: { breadcrumb: appRoutes.permissions_role.label },
        canActivate: []
      },
      {
        path: appRoutes.permissions_user.path,
        component: PermissionUserComponent,
        data: { breadcrumb: appRoutes.permissions_user.label },
        canActivate: []
      },
      {
        path: appRoutes.roles_user.path,
        component: RoleUserComponent,
        data: { breadcrumb: appRoutes.roles_user.label },
        canActivate: []
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
