import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule, ClrCommonFormsModule, ClrFormsModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './login/services/auth.service';
import { UiNotificationComponent } from './partials/ui-notification/ui-notification.component';
import { ProgressBarComponent } from './partials/progress-bar/progress-bar.component';
import { CdsModule } from '@cds/angular';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DateHelper } from './core/util/date';
import { PageNotFoundComponent } from './partials/page-not-found/page-not-found.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    UiNotificationComponent,
    ProgressBarComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    ClrCommonFormsModule,
    ClrFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdsModule,
  ],
  exports: [
    BrowserModule,
    FormsModule,
    ClarityModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    DatePipe,
    DateHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
