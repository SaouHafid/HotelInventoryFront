import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router, private loginService: LoginService) {}

  login() {
    // Simple demo logic: username: admin, password: admin
    if (this.loginService.login(this.username, this.password)) {
      this.router.navigate(['/rooms']);
    } else {
      this.error = this.loginService.error;
    }
  }
}