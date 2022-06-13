import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getResponseAuthState, getResponseData } from 'src/app/application/response/response';
import { appRoutes } from 'src/app/application/routing/app-routes';
import { UiNotificationService, UIStateStatusCode } from 'src/app/partials/ui-notification/ui-notification.service';
import { environment } from 'src/environments/environment';
import { AuthService, getAuthToken } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  errors: boolean = false;
  form: FormGroup;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private uiStateService: UiNotificationService,
    private router: Router) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  login() {
    this.uiStateService.startAction();
    this.authService.login(this.form.value.username, this.form.value.password)
      .subscribe((result) => {
        const response = (result as any).body;
        if (getResponseAuthState(response) == true) {
          localStorage.setItem(environment.LOCAL_STORAGE_KEYS.TOKEN_NAME, getAuthToken(response));
          localStorage.setItem(environment.LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(getResponseData(response).user))
          // this.authService.setData(getResponseData(response));
          this.uiStateService.endAction(UIStateStatusCode.OK, "REDIRECTION ...");
          this.router.navigateByUrl(appRoutes.commonRoutes.mainRoute.path);
        } else {
          this.uiStateService.endAction(UIStateStatusCode.BAD | UIStateStatusCode.ERROR, "Nom d'utilisateur ou mot de passe incorect");
        }
      })
  }
}
