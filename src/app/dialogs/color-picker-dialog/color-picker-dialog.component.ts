import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { Colors } from '../../shared/enums/calendar-view.enum';

@Component({
  selector: 'app-color-picker-dialog',
  imports: [MatCardModule, NgStyle],
  templateUrl: './color-picker-dialog.component.html',
  styleUrl: './color-picker-dialog.component.scss'
})
export class ColorPickerDialogComponent {
  readonly Colors = Colors;
  readonly colorsArr = Object.values(Colors);

  readonly dialogRef = inject(MatDialogRef<ColorPickerDialogComponent>);
}
