import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingUpdateDto } from '../dtos/booking-update.dto';
import { BookingCreateDto } from '../dtos/booking-create.dto';
import { environment } from 'src/environments/environment';
// import { BookingUpdateDto } from '../../dtos/update-booking.dto';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = `${environment.apiBaseUrl}/Booking`; // Base API URL

  constructor(private http: HttpClient) {}

  getBookingById(id: string): Observable<BookingUpdateDto> {
    return this.http.get<BookingUpdateDto>(`${this.apiUrl}/${id}`);
  }

  addBooking(booking: BookingCreateDto): Observable<any> {
    return this.http.post(this.apiUrl, booking);
  }

  updateBooking(id: string, booking: BookingUpdateDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, booking);
  }
}