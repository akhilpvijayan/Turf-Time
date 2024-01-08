import { LoginComponent } from './components/login/login.component';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'turf-time';

  constructor(private dialog: MatDialog) { }
  login(){
    this.dialog.open(LoginComponent,{width:'790px', height:'480px', hasBackdrop:true, panelClass: 'custom-dialog-container' });
  }
}
