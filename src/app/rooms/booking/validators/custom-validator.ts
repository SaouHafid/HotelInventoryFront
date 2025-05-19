import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export class CustomValidator {
  static maxBookingDaysValidator(): ValidatorFn {
    debugger
    return (group: AbstractControl): ValidationErrors | null => {
      const checkInCtrl = group.get('checkInDate');
      const checkOutCtrl = group.get('checkOutDate');
      const checkIn = checkInCtrl?.value;
      const checkOut = checkOutCtrl?.value;

      // Remove previous maxBookingDays errors
      if (checkInCtrl?.errors && checkInCtrl.errors['maxBookingDays']) {
        const { maxBookingDays, ...rest } = checkInCtrl.errors;
        checkInCtrl.setErrors(Object.keys(rest).length ? rest : null);
      }
      if (checkOutCtrl?.errors && checkOutCtrl.errors['maxBookingDays']) {
        const { maxBookingDays, ...rest } = checkOutCtrl.errors;
        checkOutCtrl.setErrors(Object.keys(rest).length ? rest : null);
      }

      // Helper to convert picker object to JS Date
      function toDate(obj: any): Date | null {
        if (!obj) return null;
        if (obj instanceof Date) return obj;
        if (obj.year && obj.month && obj.day) {
          // month is 1-based in ng-bootstrap
          return new Date(obj.year, obj.month - 1, obj.day);
        }
        return new Date(obj);
      }

      if (checkIn && checkOut) {
        const inDate = toDate(checkIn);
        const outDate = toDate(checkOut);
        if (inDate && outDate) {
          const diffDays = Math.floor((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays > 25) {
            checkInCtrl?.setErrors({ ...(checkInCtrl.errors || {}), maxBookingDays: true });
            checkOutCtrl?.setErrors({ ...(checkOutCtrl.errors || {}), maxBookingDays: true });
            return { maxBookingDays: true };
          }
        }
      }
      return null;
    };
  }
}