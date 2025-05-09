import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeAuthResolver implements Resolve<boolean> {
  private router = inject(Router);
  private userService = inject(UserService);


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.userService.isAuthenticated.pipe(take(1));

  }
}
