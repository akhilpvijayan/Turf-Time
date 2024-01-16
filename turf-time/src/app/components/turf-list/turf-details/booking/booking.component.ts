import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TurfDetails } from './../../../shared/interface/turfDetails';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit{
  bookingForm!: FormGroup;
  count: number = 1;
  totalAmount: number = 0;
  allowedHours: { value: string, label: string }[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: TurfDetails, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initialiseForm();
    this.totalAmount = this.data.pricePerHour;
    this.generateAllowedHours();
  }

  initialiseForm() {
    this.bookingForm = this.formBuilder.group({
      gameType: [, Validators.required],
      startTime: ['', Validators.required],
      gameDate: [, Validators.required],
      groundFare: [this.data.pricePerHour],
      hours: [this.count, Validators.required]
    })
  }

  generateAllowedHours() {
    for (let hour = 1; hour <= 12; hour++) {
      const amLabel = `${hour} AM`;
      const pmLabel = `${hour} PM`;

      this.allowedHours.push({ value: amLabel, label: amLabel });
      this.allowedHours.push({ value: pmLabel, label: pmLabel });
  }
      // Sort the array based on time values
      this.allowedHours.sort((a, b) => this.compareTimes(a.value, b.value));
}

  // Compare time values in the format "hh AM/PM"
  compareTimes(timeA: string, timeB: string): number {
    const [hourA, amPmA] = timeA.split(' ');
    const [hourB, amPmB] = timeB.split(' ');

    const isAmA = amPmA === 'AM';
    const isAmB = amPmB === 'AM';

    if (isAmA && !isAmB) {
      return -1;
    } else if (!isAmA && isAmB) {
      return 1;
    } else {
      const numericHourA = parseInt(hourA, 10);
      const numericHourB = parseInt(hourB, 10);

      return numericHourA - numericHourB;
    }
  }

  decreaseCount() {
    if (this.count > 1) {
      this.count--;
      this.totalAmount -=this.bookingForm.value.groundFare;
    }
  }
  
  increaseCount() {
    this.count++;
    this.totalAmount +=this.bookingForm.value.groundFare;
  }

  onSubmit(){

  }
}
