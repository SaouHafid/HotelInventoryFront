import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Room, RoomList } from './rooms'; // Import the Room model
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from '../services/rooms.service';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { HttpEventType } from '@angular/common/http';
import { catchError, Subject } from 'rxjs';

@Component({
  selector: 'hotelinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, AfterViewInit {
  constructor(private roomService: RoomsService) { }

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent; // Reference to the header component
  hotelName: string = 'Hotel California';
  toggleVisibility: boolean = false; // Property to track visibility
  rooms: Room = {
    id: '1',
    totalRooms: 100,
    availableRooms: 0,
    bookedRooms: 80
  }
  title: string = 'Rooms-List';
  roomList: RoomList[] = [];
  selectedRoom!: RoomList;
  error$ = new Subject<string>(); // Subject to handle errors
  getError$ = this.error$.asObservable(); // Observable to expose the error subject
  // Observable to fetch rooms from the service
  rooms$ = this.roomService.getRooms$.pipe(
    catchError((error) => {
      this.error$.next('Error fetching rooms from server.'); // Emit error message
      console.error('Error fetching rooms:', error);
      return ([]); // Return an empty array or handle the error as needed
    })
  );

  ngOnInit(): void {
    console.log(this.headerComponent);
    // Fetch rooms from the API
    this.roomService.getRoomsList().subscribe({
      next: (rooms) => {
        this.roomList = rooms;
        console.log('Rooms fetched from API:', this.roomList);
      },
      error: (err) => {
        console.error('Error fetching rooms:', err);
      }
    });
  }

  ngAfterViewInit(): void {
    console.log(this.headerComponent.title); // Accessing the header component's title property
    this.headerComponent.title = 'Rooms-List Changed from parent (Room) component.'; // Changing the header component's title
  }
  toggle_Visibility(): void {
    this.toggleVisibility = !this.toggleVisibility; // Toggle the visibility
    this.title = "Rooms-List Changed from parent component."
  }
  selectRoom(room: RoomList): void {
    this.selectedRoom = room;
  }


  addRoom(): void {
    const newRoom: CreateRoomDto = {
      number: '6',
      roomType: 'Luxury Room',
      amenities: 'Free Wi-Fi, Air Conditioning, TV, Mini Bar, Spa',
      price: 300,
      photos: 'https://example.com/luxury.jpg',
      checkInDate: new Date('2023-10-01'),
      checkOutDate: new Date('2023-10-05'),
    status: 'Available',
    rating: 4
  };

  this.roomService.addRoom(newRoom).subscribe({
    next: (room) => {
      console.log('Room added:', room);

      // Fetch the updated room list from the backend
      this.roomService.getRoomsList().subscribe({
        next: (rooms) => {
          this.roomList = rooms; // Update the local list with the latest data
          console.log('Updated room list:', this.roomList);
        },
        error: (err) => {
          console.error('Error fetching updated room list:', err);
        }
      });
    },
    error: (err) => {
      console.error('Error adding room:', err);
    }
  });
}
  updateRoom(roomId: string): void {
    const updatedRoom: Partial<CreateRoomDto> = {
      price: 350,
      status: 'Booked'
    };

    this.roomService.updateRoom(roomId, updatedRoom).subscribe({
      next: (room) => {
        console.log('Room updated:', room);
      },
      error: (err) => {
        console.error('Error updating room:', err);
      }
    });
  }

  updateRoomWithReelTimeRefresh(updatedRoom: RoomList): void {
    this.roomService.updateRoom(updatedRoom.number, updatedRoom).subscribe({
      next: (room) => {
        console.log('Room updated:', room);

        // Refresh the roomList array with the updated room
        const index = this.roomList.findIndex(r => r.number === room.number);
        if (index !== -1) {
          this.roomList[index] = room; // Replace the old room with the updated room
        }
      },
      error: (err) => {
        console.error('Error updating room:', err);
      }
    });
  }

  deleteRoom(roomId: string): void {
    this.roomService.deleteRoom(roomId).subscribe({
      next: () => {
        console.log('Room deleted:', roomId);
        this.roomList = this.roomList.filter(room => room.number !== roomId); // Update the local list
      },
      error: (err) => {
        console.error('Error deleting room:', err);
      }
    });
  }

  downloadProgress: number = 0; // To track the download progress percentage
  isDownloading: boolean = false; // To track whether a download is in progress

  downloadLargePhotos(): void {
    this.isDownloading = true;
    this.roomService.streamLargeResponse().subscribe({
      next: (event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          // Calculate and update download progress
          if (event.total) {
            this.downloadProgress = Math.round((event.loaded / event.total) * 100);
          }
        } else if (event.type === HttpEventType.Response) {
          // Handle the downloaded file
          const blob = event.body as Blob;
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'photos.json'; // Set the file name
          a.click();
          window.URL.revokeObjectURL(url);
          this.isDownloading = false;
          this.downloadProgress = 0; // Reset progress
        }
      },
      error: (err) => {
        console.error('Error downloading photos:', err);
        this.isDownloading = false;
      }
    });
  }
}
