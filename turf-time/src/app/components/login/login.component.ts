import { AuthService } from './../shared/auth/auth.service';
import { SignupComponent } from './../signup/signup.component';
import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Login } from '../shared/interface/login';
import { User } from '../shared/interface/signup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm : Login = new Login;
  isLoggedIn: boolean = false;
  loggedInDetails: any;

  constructor(private dialog: MatDialog, private authService: AuthService,private dialogRef: MatDialogRef<LoginComponent>) {}
  
  onSubmit(form: Form){
    this.authService.signIn(this.loginForm.email, this.loginForm.password)
    .subscribe(
      (userDetails) => {
       this.dialog.closeAll();
       this.isLoggedIn = true;
       this.loggedInDetails = JSON.parse(localStorage.getItem('user')!);
       this.dialogRef.close(this.loggedInDetails);
      },
      (error) => {
        // Handle sign-in error
        console.error('Sign-in error:', error);
      });
  }
  
  register(){
    const dialogRef: MatDialogRef<SignupComponent> = this.dialog.open(SignupComponent,{width:'990px', height:'550px', hasBackdrop:true, panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe((result: any) => {

    });
  }
}
