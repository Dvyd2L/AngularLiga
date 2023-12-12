import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ILoginRequest, ILoginResponse } from '@interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  login(usuario: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.apiURL.href + 'Usuarios/login', usuario);
  }

  logout(): void {
    localStorage.removeItem('usuario');
  }
}
