import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'hotelinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges{
  constructor(private roomService: RoomsService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  } 

  @Input() roomList!: RoomList[] | null;
  @Input() title!: string;
  @Output() selectedRoom = new EventEmitter<RoomList>();
  ngOnInit(): void {
    
  }
  selectRoom(room: RoomList) {
    debugger
        this.alertRoomDetails(room);
    this.selectedRoom.emit(room);
  }

    alertRoomDetails(room: RoomList): void {
      this.roomService.getRoomById("6F00C15C-CF7C-4BA5-8C95-1709095FE443").subscribe({
        next: (roomDetails) => {
          console.log('Room details:', roomDetails);
          alert(`Room Details:\nNumber: ${roomDetails.number}\nType: ${roomDetails.roomType}\nPrice: ${roomDetails.price}\nStatus: ${roomDetails.status}`);
          // You can also update the selectedRoom property if needed
          //this.selectedRoom = roomDetails; // Update the selected room with the fetched details
        },
        error: (err) => {
          console.error('Error fetching room details:', err);
        }
      });
    }
}
