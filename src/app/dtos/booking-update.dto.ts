import { BookingCreateDto } from "./booking-create.dto";

export interface BookingUpdateDto extends BookingCreateDto {
  bookingId: string;
}