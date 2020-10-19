import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSindicato implements CanActivate {
  
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate() {
    if(this.auth.sindicato || this.auth.user.su) {
      return true;
    } else {
      this.router.navigateByUrl('/dashboard/v7');
    }
  }
}