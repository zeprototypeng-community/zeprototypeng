import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { _isDefined } from 'src/app/core/util/type-utils';
import { ProgressBarService } from '../progress-bar/progress-bar.service';

export enum UIStateStatusCode {
    OK = 200,
    CREATED = 201,
    BAD = 422,
    ERROR = 500,
    UNAUTHORIZED = 401,
    AUTHENTICATED = 202,
    UNAUTHENTICATED = 403,
    INFO = 0
}

@Injectable({
    providedIn: 'root'
})
export class UiNotificationService {

    private _alert = new Subject<{state: boolean, code?: UIStateStatusCode, message: string}>();
    alert = this._alert.asObservable();

    constructor(private progress: ProgressBarService) { }

    startAction() {
        this.progress.start();
        // this._alert.next({state: true, code: null, message: null})
    }

    endAction(code?: UIStateStatusCode, message?: string) {
        this.progress.stop();
        if (_isDefined(code) && _isDefined(message)) {
            this._alert.next({state: false, code: code, message: message});
        }
    }

    info(message: string) {
        this._alert.next({state: true, code: UIStateStatusCode.INFO, message: message});
    }


}
