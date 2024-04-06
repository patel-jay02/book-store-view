import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../common.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = environment.apiEndpoint;
  private token!: string;

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/book/store/api/v1/login`, credentials)
      .pipe(
        tap((response: { result: string }) => {
          this.token = response.result;
          localStorage.setItem('token', this.token);
        })
      );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
