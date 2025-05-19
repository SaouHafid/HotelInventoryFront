import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { RequestInterceptor } from './request.interceptor';
//import { EmployeeComponent } from './employee/employee.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoomComponent } from './rooms/add-room/add-room.component';
import { HoverDirective } from '../directives/hover.directive';
import { EmployeeModule } from './employee.module';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './rooms/booking/booking.component';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    RoomsListComponent,
    HeaderComponent,
    ContainerComponent,
    //EmployeeComponent,
    AppNavComponent,
    NotFoundComponent,
    RoomsBookingComponent,
    AddRoomComponent,
    HoverDirective,
    LoginComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    //EmployeeModule, // Must be imported here before AppRoutingModule, otherwise it won't work,
    // because AppRoutingModule we have { path: '**', component: NotFoundComponent } // Wildcard route for a 404 page
    // so it will look for the NotFoundComponent in the first before showing the EmployeeModule
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbCollapseModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
