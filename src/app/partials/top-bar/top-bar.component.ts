import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/application/routing/app-routes';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  dashboardPath = `/${appRoutes.commonRoutes.mainRoute.path}/${appRoutes.commonRoutes.homeRoute.path}`;

  profilRoute = '#';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogOut() {
    const x = window.confirm("Voulez-vous vous déconnecter ?");
    if (x === true) {
      this.authService.logout();
      this.router.navigateByUrl(appRoutes.login.path)
    }
  }

}
