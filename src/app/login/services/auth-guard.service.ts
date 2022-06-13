import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { _isDefined } from 'src/app/core/util/type-utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  /**
   * Constructor
   * @param router The router object
   */
  constructor(
    private router: Router
  ) { }

  /**
   * Can activate function
   * @param next The activated route snapshot object
   * @param state The router state snapshot object
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (_isDefined(localStorage.getItem(environment.LOCAL_STORAGE_KEYS.TOKEN_NAME))) {
      return true;
    }

    localStorage.removeItem(environment.LOCAL_STORAGE_KEYS.TOKEN_NAME);
    this.router.navigateByUrl('/login');
    return false;
  }
}
