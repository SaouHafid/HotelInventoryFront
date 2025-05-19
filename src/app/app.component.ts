import { Component } from '@angular/core';
import { GlobalErrorHandler } from './global-error-handler';
import { LoginService } from './services/login.service';

@Component({
  selector: 'hotelinv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HotelInventory';

    constructor(public loginService: LoginService) {}


  get globalError(): string | null {
    return GlobalErrorHandler.lastError;
  }
}
