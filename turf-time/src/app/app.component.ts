import { LoginComponent } from './components/login/login.component';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'turf-time';
  isLoggedIn: boolean = false;
  loggedInDetails: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('user')!) != null){
      this.isLoggedIn = true;
      this.loggedInDetails = JSON.parse(localStorage.getItem('user')!);
    }
  }
  login(){
    const dialogRef: MatDialogRef<LoginComponent> =this.dialog.open(LoginComponent,{width:'790px', height:'480px', hasBackdrop:true, panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe((result: any) => {
      if(result.userName){
        this.isLoggedIn = true;
        this.loggedInDetails = result;
      }
    });
  }

  logOut(){
    localStorage.setItem('user', 'null');
    window.location.reload();
  }
}
