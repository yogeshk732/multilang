import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})


export class LoggedInAuthGuardService {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
