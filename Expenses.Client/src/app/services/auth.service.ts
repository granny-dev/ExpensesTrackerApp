import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/authresponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   //private readonly apiUrl = 'https://localhost:7275/api/Auth';
   private readonly apiUrl = 'https://expensesserver.azurewebsites.net/api/Auth';
   private readonly currentUser = new BehaviorSubject<string | null>(null);
    currentUser$ = this.currentUser.asObservable();

  constructor(private readonly http: HttpClient, private readonly router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser.next(token);
    }
  }

  login(creds:User) : Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/Login`, creds)
    .pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.token);
        this.currentUser.next('user');
      })
    );
  }

   register(creds:User) : Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/Register`, creds)
    .pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.token);
        this.currentUser.next('user');
      })
    );
  }

  logout() : void{
    localStorage.removeItem('token');
    this.currentUser.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
