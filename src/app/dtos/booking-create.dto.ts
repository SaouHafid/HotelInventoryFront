import { GuestDto } from "./guest.dto";

export interface BookingCreateDto {
  roomId: string;
  guestEmail: string;
  checkInDate: Date;
  checkOutDate: Date;
  bookingStatus: string;
  bookingAmount: number;
  bookingDate: Date;
  mobileNumber: string;
  guestName: string;
  guestAddress: string;
  guestCity: string;
  guestState: string;
  guestCountry: string;
  guestZipCode: string;
  guestCount: number;
  guests: GuestDto[];
}