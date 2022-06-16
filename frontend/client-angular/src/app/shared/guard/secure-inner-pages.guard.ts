import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecureInnerPagesGuard implements CanActivate {
  id: string = '';
  connectedUser: any;
  role: string | undefined;

  constructor() {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | boolean {
    this.role = localStorage.getItem('userRole')?.toString();
    if (this.role !== 'manager') {
      window.history.back();
      return false;
    }
    return true;
  }
}
