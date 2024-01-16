import { BookingComponent } from './booking/booking.component';
import { TurfDetails } from './../../shared/interface/turfDetails';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TurfService } from '../turf.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-turf-details',
  templateUrl: './turf-details.component.html',
  styleUrls: ['./turf-details.component.scss']
})
export class TurfDetailsComponent {
  turfId = '';
  turf: TurfDetails = new TurfDetails;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private turfService: TurfService,
    private dialog: MatDialog) { }
  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.turfId = params['q'];
      if (this.turfId != '') {
        this.turfService.getAllTurfs().subscribe((res: any) => {
          const data = res.map((e: any) => {
            const d = e.payload.doc.data();
            if (d.turfId === parseInt(this.turfId.toString(), 10)) {
              this.turf = d;
            }
          })
        })
      }
    });
  }

  goBack() {
    this.location.back();
  }

  bookNow() {
    if (JSON.parse(localStorage.getItem('user')!) != null) {
      this.openBookingForm();
    }
    else {
      const dialogRef: MatDialogRef<LoginComponent> = this.dialog.open(LoginComponent, { width: '790px', height: '480px', hasBackdrop: true, panelClass: 'custom-dialog-container' });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result.userName) {
          this.openBookingForm();
        }
      });
    }
  }

  openBookingForm() {
    const dialogRef: MatDialogRef<BookingComponent> = this.dialog.open(BookingComponent, { width: '490px', height: '550px', hasBackdrop: true, panelClass: 'custom-dialog-container', data: this.turf });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.userName) {

      }
    });
  }
}
