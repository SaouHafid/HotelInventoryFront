import { Component } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'hotelinv-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent {
  successMessage: string = '';
  room: RoomList = {
    id: '',
    number: '',
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkInDate: new Date(),
    checkOutDate: new Date(),
    status: '',
    rating: undefined
  };

  constructor(private roomService: RoomsService) {}

  // Handle form submission
  onSubmit(form: NgForm): void {
    this.roomService.addRoom(this.room).subscribe({
      next: (room) => {
        console.log('Room added successfully:', room);
        this.successMessage = 'Room added successfully!';
        // Optionally, you can reset the form or redirect the user
        // For example, you can reset the form fields
        form.resetForm({
          number: '',
          roomType: '',
          amenities: '',
          price: 0,
          photos: '',
          checkInDate: new Date(),
          checkOutDate: new Date(),
          status: '',
          rating: undefined
        });
        // Or redirect to another page
        // this.router.navigate(['/rooms']); // Adjust the route as needed
      },
      error: (err) => {
        console.error('Error adding room:', err);
      }
    });
  }
}
