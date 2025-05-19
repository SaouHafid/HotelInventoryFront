import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, share, shareReplay } from 'rxjs';
import { RoomList } from '../rooms/rooms';
import { environment } from '../../environments/environment';
import { CreateRoomDto } from '../dtos/create-room.dto'; // Import the DTO

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private roomsUrl = `${environment.apiBaseUrl}/RoomList`; // Base API URL

  constructor(private http: HttpClient) {}

  getRooms$ = this.http.get<RoomList[]>(this.roomsUrl);

  // getRooms$ = this.http.get<RoomList[]>(this.roomsUrl).pipe(
  //   shareReplay(1) // Cache the response for subsequent subscribers
  // );
  // Fetch all rooms
  getRoomsList(): Observable<RoomList[]> {
    return this.http.get<RoomList[]>(this.roomsUrl);
  }

  // Add a new room
  addRoom(newRoom: CreateRoomDto): Observable<RoomList> {
    return this.http.post<RoomList>(this.roomsUrl, newRoom);
  }

  // Get a room by ID
  getRoomById(roomId: string): Observable<RoomList> {
    const url = `${this.roomsUrl}/${roomId}`;
    return this.http.get<RoomList>(url);
  }

  // Update a room
  updateRoom(roomId: string, updatedRoom: Partial<CreateRoomDto>): Observable<RoomList> {
    const url = `${this.roomsUrl}/${roomId}`;
    return this.http.put<RoomList>(url, updatedRoom);
  }

  // Delete a room
  deleteRoom(roomId: string): Observable<void> {
    const url = `${this.roomsUrl}/${roomId}`;
    return this.http.delete<void>(url);
  }

  private postsUrl = 'https://jsonplaceholder.typicode.com/posts'; // JSONPlaceholder API URL

  // Stream large responses (e.g., downloading a file)
  streamLargeResponse(): Observable<any> {
    const request = new HttpRequest('GET', this.postsUrl, {
      responseType: 'blob', // Set response type to 'blob' for binary data
      reportProgress: true // Enable progress reporting
    });

    return this.http.request(request);
  }
}