import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuestGuardService {

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
    if (!localStorage.getItem(environment.LOCAL_STORAGE_KEYS.TOKEN_NAME)) { return true; }
    this.router.navigateByUrl('/');
    return false;
  }
}
