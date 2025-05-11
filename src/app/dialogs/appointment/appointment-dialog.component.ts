import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { first } from 'rxjs';
import { Colors } from '../../shared/enums/calendar-view.enum';
import { IAppointment } from '../../shared/models/appointment.model';
import { timeRangeValidator } from '../../shared/validators/time-range.validator';
import { ColorPickerDialogComponent } from '../color-picker-dialog/color-picker-dialog.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-appointment',
  imports: [
    NgIf,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './appointment-dialog.component.html',
  styleUrl: './appointment-dialog.component.scss',
})
export class AppointmentDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AppointmentDialogComponent>);
  readonly data = inject<IAppointment>(MAT_DIALOG_DATA);
  readonly matDialog = inject(MatDialog);

  appointmentForm = new FormGroup(
    {
      title: new FormControl(this?.data?.title || '', Validators.required),
      date: new FormControl(this?.data?.date || '', Validators.required),
      color: new FormControl(this?.data?.color || Colors.Default),
      startTime: new FormControl(
        this?.data?.startTime || '',
        Validators.required
      ),
      endTime: new FormControl(this?.data?.endTime || '', Validators.required),
    },
    {
      validators: timeRangeValidator('startTime', 'endTime'),
    }
  );

  onSubmit() {
    if (this.appointmentForm.invalid) return;

    const { date, endTime, startTime, title, color } =
      this.appointmentForm.getRawValue();

    const data: IAppointment = {
      date: date || new Date(),
      endTime: endTime || '',
      startTime: startTime || '',
      title: title || '',
      uuid: this.data.uuid,
      color: color || Colors.Default,
    };

    this.dialogRef.close(data);
  }

  onDelete() {
    this.matDialog
      .open(MessageDialogComponent)
      .afterClosed()
      .pipe(first())
      .subscribe((confirmed) =>
        confirmed
          ? this.dialogRef.close({ ...this.data, remove: true })
          : this.dialogRef.close()
      );
  }

  openColorPickerDialog() {
    this.matDialog
      .open(ColorPickerDialogComponent)
      .afterClosed()
      .pipe(first())
      .subscribe((color: Colors) =>
        this.appointmentForm.get('color')?.setValue(color ?? this.data.color)
      );
  }

  get colorControl() {
    return this.appointmentForm.get('color')?.value;
  }

  get isEditMode(): boolean {
    return !!this?.data?.uuid;
  }

  get dialogTitle(): string {
    return this.isEditMode ? 'Edit Appointment' : 'Add Appointment';
  }

  get submitButtonIcon(): string {
    return this.isEditMode ? 'edit' : 'check';
  }

  get submitButtonLabel(): string {
    return this.isEditMode ? 'Edit Appointment' : 'Add Appointment';
  }
}
