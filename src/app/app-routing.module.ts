import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { EmployeeComponent } from './employee/employee.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';
import { AddRoomComponent } from './rooms/add-room/add-room.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';
import { BookingComponent } from './rooms/booking/booking.component';
import { bookingGuard } from './rooms/booking/guards/booking.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: '/rooms', pathMatch: 'full' },
      { path: 'booking', component: BookingComponent, canDeactivate: [bookingGuard] }, // Route for booking
      { path: 'rooms', component: RoomsComponent,
        children: [
          { path: ':id', component: RoomsBookingComponent } // Route with a parameter
        ]
      },
      { path: 'rooms/:id', component: RoomsBookingComponent }, // Route with a parameter
      { path: 'add-room', component: AddRoomComponent }, // Route for adding a room
      {
        path: 'employee',
        loadChildren: () =>
          import('./employee.module').then(m => m.EmployeeModule)
      },
      { path: '**', component: NotFoundComponent } // Wildcard route for a 404 page
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
