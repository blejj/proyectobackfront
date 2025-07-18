import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private URL = 'http://localhost:3000/api/auth';
  private URLUser = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.URL}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.URL}/register`, data);
  }
  
  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.URLUser}/${email}`);
  }
}
