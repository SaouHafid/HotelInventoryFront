export interface Room {
    id: string;
    totalRooms: number;
    availableRooms: number;
    bookedRooms: number;
}

export interface RoomList {
    id: string;
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