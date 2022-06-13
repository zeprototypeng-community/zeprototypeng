import { Component, OnInit } from '@angular/core';
import { appRoutes } from 'src/app/application/routing/app-routes';

interface RouteMap {
  label: string, 
  path?: string, 
  permissions?: string[],
  icon?: string,
  children?: RouteMap[]
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  routes: RouteMap[] = [
    {
      label: "Sécurité",
      permissions: [],
      icon: "lock",
      children:  [
        {
          label: "Utilisateurs",
          path: appRoutes.users.path,
          permissions: [],
        },
        {
          label: "Roles",
          path: appRoutes.roles.path,
          permissions: [],
        },
        {
          label: "Permissions",
          path: appRoutes.permissions.path,
          permissions: [],
        },
        {
          label: "Affecter des permissions aux rôles",
          path: appRoutes.permissions_role.path,
          permissions: []
        },
        {
          label: "Affecter des rôles",
          path: appRoutes.roles_user.path,
          permissions: []
        },
        {
          label: "Affecter des permissions",
          path: appRoutes.permissions_user.path,
          permissions: []
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
