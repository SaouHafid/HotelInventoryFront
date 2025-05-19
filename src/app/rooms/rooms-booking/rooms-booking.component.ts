import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';
import { RoomList } from '../rooms';

@Component({
  selector: 'hotelinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {
  id!: string;
  room?: RoomList;

  constructor(private route: ActivatedRoute, private roomService: RoomsService) { }

  ngOnInit(): void {
    //this.id = this.route.snapshot.paramMap.get('id')!;
    // Using paramMap to get the room ID from the route, this is useful for only the case 
    // When fetching the room details based on the ID in another page after a redirection.
    // For example, when you click on a room in the list and navigate to the booking page.
    // So we can use the snapshot to get the ID from the route parameters,
    // Because snapshot is used when we want to get the parameters only once when the component is initialized.
    // But in this case, we are using the room ID to fetch the room details from the API and the component rooms-booking.component.ts
    // is used as a Nested component in the room-list component. So must subscribe to the paramMap observable. 
    // To be able to get the ID from the route parameters and reinitialize the room details
    // when the route changes.
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.roomService.getRoomById(this.id).subscribe({
        next: (room) => this.room = room,
        error: (err) => console.error('Error fetching room:', err)
      });
    });
  }

  bookRoom() {
    // Logic to book a room
    console.log('Room booked successfully!');
  }
}
