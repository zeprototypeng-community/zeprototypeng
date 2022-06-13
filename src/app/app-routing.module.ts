import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './application/routing/app-routes';
import { PageNotFoundComponent } from './partials/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: appRoutes.login.path
  },
  {
    path: appRoutes.login.path,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    data: {
      moduleName: ''
    }
  },
  {
    path: appRoutes.commonRoutes.mainRoute.path,
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
