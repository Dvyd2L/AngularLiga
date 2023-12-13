import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) {}

  isLoggedIn() {
    const user = localStorage.getItem(environment.userToken);
    
    if (user) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
