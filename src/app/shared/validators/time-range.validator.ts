import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export function timeRangeValidator(
  startTime: string,
  endTime: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const startValue = formGroup.get(startTime)?.value;
    const endValue = formGroup.get(endTime)?.value;

    if (!startValue || !endValue) return null;

    const [startHours, startMinutes] = startValue.split(':').map(Number);
    const [endHours, endMinutes] = endValue.split(':').map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    if (startTotalMinutes >= endTotalMinutes) {
      return { timeRangeInvalid: true };
    }

    return null;
  };
}
