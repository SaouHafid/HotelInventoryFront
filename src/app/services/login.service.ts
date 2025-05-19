import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  error: string = '';

  constructor() {
   }
  // Simple demo logic: username: admin, password: admin
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('token', 'demo-token');
      this.isLoggedIn = true;
      this.isAdmin = true;
      this.error = '';
    } else if(username === 'employee' && password === 'employee') {
      localStorage.setItem('token', 'demo-token');
      this.isLoggedIn = true;
      this.isEmployee = true;
      this.error = '';
    } else {
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.isEmployee = false;
      localStorage.removeItem('token');
      this.error = 'Invalid credentials';
    }
    return this.isLoggedIn;
  }
  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isEmployee = false;
    this.error = '';
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
