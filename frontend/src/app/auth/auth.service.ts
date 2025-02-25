import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable'; 
import { IUser } from './models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient) { }

  storeToken(token: string): void { 
    localStorage.setItem('token', token);
  }
 
  login(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  // Envoie les donnees en ligne 
  register(data: any): Observable<any> {
    return this.http.post<IUser>(`${environment.apiUrl}/auth/register`, data);
  }

  // Envoie les donnees en ligne 
  entreprise(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/entreprise/pg`, data); 
  } 
  
  user(): Observable<IUser> {
    var user_uuid = localStorage.getItem("auth_id");
    let params = new HttpParams();
    if (user_uuid) {
      params = params.set("user_uuid", user_uuid);
    }
    return this.http.get<IUser>(`${environment.apiUrl}/auth/user`, { params });
  }

  // user(): Observable<IUser> { 
  //   return this.http.get<IUser>(`${environment.apiUrl}/auth/user`);
  // }

  logout(): Observable<void> {
    localStorage.removeItem('token');
    return this.http.post<void>(`${environment.apiUrl}/auth/logout`, {});
  }

  updateInfo(data: any): Observable<IUser> {
    return this.http.put<IUser>(`${environment.apiUrl}/auth/profil/info`, data);
  }

  updatePassword(data: any): Observable<IUser> {
    return this.http.put<IUser>(`${environment.apiUrl}/auth/change-password`, data);
  }

 
}

