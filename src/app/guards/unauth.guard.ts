import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/book']);
      return false;
    } else {
      return true;
    }
  }
  
}
