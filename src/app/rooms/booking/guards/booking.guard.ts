import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingComponent } from '../booking.component';
import { Observable } from 'rxjs';

export const bookingGuard: CanDeactivateFn<BookingComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if (component.bookingForm.pristine) {
    return true;
  }

  const snackBar = inject(MatSnackBar);

  return new Promise<boolean>((resolve) => {
    const ref = snackBar.open(
      'If you click continue the unsaved data will be lost!',
      'Continue',
      {
        duration: 3000,
        panelClass: ['mat-warn'],
        
      }
    );

    ref.onAction().subscribe(() => {
      resolve(true); // User chose to continue (lose data)
    });

    ref.afterDismissed().subscribe((info) => {
      if (!info.dismissedByAction) {
        resolve(false); // User did not click "Continue", so stay
      }
    });
  });
};
