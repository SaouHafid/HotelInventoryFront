import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BookingUpdateDto } from 'src/app/dtos/booking-update.dto';
import { BookingCreateDto } from 'src/app/dtos/booking-create.dto';
import { BookingService } from 'src/app/services/booking.service';
import { CustomValidator } from 'src/app/rooms/booking/validators/custom-validator';

@Component({
  selector: 'hotelinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  addressCollapsed = true; // collapsed by default
  descriptionCollapsed = true; // collapsed by default
  bookingDetails: BookingUpdateDto | null = null;
  successMessage = '';

  constructor(private fb: FormBuilder, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      bookingId: [''],
      roomId: ['', Validators.required],
      guestEmail: ['', [Validators.email]], // Remove required here
      checkInDate: [null, Validators.required],
      checkOutDate: [null, Validators.required],
      bookingStatus: ['', Validators.required],
      bookingAmount: [0, Validators.required],
      bookingDate: [null, Validators.required],
      mobileNumber: [''], // Remove required here
      guestName: ['', Validators.minLength(3)],
      guestCount: [1, Validators.required],
      guestList: [[]],
      address: this.fb.group({
        guestAddress: ['', Validators.required],
        guestCity: [''],
        guestState: [''],
        guestCountry: [''],
        guestZipCode: ['']
      }),
      guests: this.fb.array([]),
      TnC: [false, Validators.requiredTrue]
    }, { validators: CustomValidator.maxBookingDaysValidator() });

    // Subscribe to bookingStatus changes
    this.bookingForm.get('bookingStatus')?.valueChanges.subscribe(status => {
      const emailControl = this.bookingForm.get('guestEmail');
      const phoneControl = this.bookingForm.get('mobileNumber');

      if (status === 'Pending') {
        emailControl?.setValidators([Validators.required, Validators.email]);
        phoneControl?.setValidators([Validators.required]);
      } else {
        emailControl?.setValidators([Validators.email]);
        phoneControl?.clearValidators();
      }
      emailControl?.updateValueAndValidity();
      phoneControl?.updateValueAndValidity();
    });
  }

  get guests(): FormArray {
    return this.bookingForm.get('guests') as FormArray;
  }

  addDescription() {
    this.bookingForm.addControl('description', this.fb.control(''));
  }

  addGuest() {
    this.guests.push(
      this.fb.group({
        guestName: ['', Validators.required], // <-- required validator
        guestAge: ['', [Validators.required, Validators.min(0)]]
      })
    );
  }

  removeGuest(index: number) {
    this.guests.removeAt(index);
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      console.log('Booking Data:', this.bookingForm.value);
      // Call your booking service here
    }
  }
  toggleDescription() {
    this.descriptionCollapsed = !this.descriptionCollapsed;
  }

  getBookingById(id: string) {
    this.bookingService.getBookingById(id).subscribe({
      next: (data) => this.bookingDetails = data,
      error: () => alert('Error fetching booking!')
    });
  }

  addBooking() {
    if (this.bookingForm.valid) {
      const booking: BookingCreateDto = this.bookingForm.value;
      this.bookingService.addBooking(booking).subscribe({
        next: () => {
          this.successMessage = 'Booking added successfully!';
          this.bookingForm.reset();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => alert('Error adding booking!')
      });
    }
  }

  updateBooking(id: string) {
    if (this.bookingForm.valid) {
      const booking: BookingUpdateDto = { ...this.bookingForm.value, bookingId: id };
      this.bookingService.updateBooking(id, booking).subscribe({
        next: () => {
          this.successMessage = 'Booking updated successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => alert('Error updating booking!')
      });
    }
  }
}
