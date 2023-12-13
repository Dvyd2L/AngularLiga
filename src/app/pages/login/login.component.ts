import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { AuthGuardService } from '@guards/auth-guard.service';
import { ILoginRequest } from '@interfaces/login';
import { LoginService } from '@services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, AuthGuardService, Router],
  imports: [FormsModule],
  standalone: true
})
export class LoginComponent {
  usuario: ILoginRequest = {
    email: '',
    password: ''
  };

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private authGuardServide: AuthGuardService) {}

  ngOnInit() {}

  login() {
    this.loginService.login(this.usuario).subscribe({
      next: (data) => {
        localStorage.setItem(environment.userToken, JSON.stringify(data));
        this.router.navigateByUrl('equipos');
      },
      error: (err) => {
        alert('Credenciales erróneas');
      },
      complete: () => {}
    });
  }
}
