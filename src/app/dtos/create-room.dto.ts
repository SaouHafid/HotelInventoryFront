export interface CreateRoomDto {
  number: string; 
  roomType: string;
  amenities: string;
  price: number;
  photos: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: string; 
  rating?: number; // Optional property for rating
}