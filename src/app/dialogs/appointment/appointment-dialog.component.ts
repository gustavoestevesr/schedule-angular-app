import { AfterViewInit, Component, ElementRef, inject, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';
import { timeRangeValidator } from '../../shared/validators/time-range.validator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface AppointmentDialogData {
  uuid: string;
  date: Date;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
}

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
  readonly data = inject<AppointmentDialogData>(MAT_DIALOG_DATA);
  readonly matDialog = inject(MatDialog);

  appointmentForm = new FormGroup({
    title: new FormControl(this?.data?.title || '', Validators.required),
    date: new FormControl(this?.data?.date || '', Validators.required),
    startTime: new FormControl(this?.data?.startTime ||'', Validators.required),
    endTime: new FormControl(this?.data?.endTime ||'', Validators.required),
  },
  {
    validators: timeRangeValidator('startTime', 'endTime'),
  });

  onSubmit() {
    if (this.appointmentForm.invalid) return;
    this.dialogRef.close(this.appointmentForm.getRawValue());
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
