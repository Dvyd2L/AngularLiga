import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { IEquipo } from '@interfaces/equipo';
import { ILoginResponse } from '@interfaces/login';


@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  urlAPI = environment.apiURL + 'api';

  constructor(public http: HttpClient) {}

  getEquipos(): Observable<IEquipo[]> {
    const headers = this.getTokenHeader();
    return this.http.get<IEquipo[]>(`${this.urlAPI}/Equipos`, { headers: headers });
  }

  addEquipo(equipo: IEquipo): Observable<any> {
    const headers = this.getTokenHeader();
    return this.http.post(`${this.urlAPI}/Equipos`, equipo, { headers: headers });
  }

  updateEquipo(equipo: IEquipo): Observable<any> {
    const headers = this.getTokenHeader();
    return this.http.put(`${this.urlAPI}/Equipos/${equipo.id}`, equipo, { headers: headers });
  }

  deleteEquipo(id: number): Observable<any> {
    const headers = this.getTokenHeader();
    return this.http.delete(`${this.urlAPI}/Equipos/${id}`, { headers: headers });
  }

  getTokenHeader(): HttpHeaders {
    const user: ILoginResponse = JSON.parse(localStorage.getItem(environment.userToken) ?? '');
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });
    return headers;
  }
}