import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { _isDefined } from 'src/app/core/util/type-utils';

@Injectable({
    providedIn: 'root'
})
export class ProgressBarService {

    private _progress = new Subject<boolean>();
    progress = this._progress.asObservable();

    constructor() { }

    start() {
        this._progress.next(true)
    }

    stop() {
        this._progress.next(false);
    }
}
