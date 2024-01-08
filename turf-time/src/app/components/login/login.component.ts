import { SignupComponent } from './../signup/signup.component';
import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Login } from '../shared/login';
import { User } from '../shared/signup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm : Login = new Login;
  isLoggedIn: boolean = false;
  loggedInDetails: any;

  constructor(private dialog: MatDialog) {}
  
  onSubmit(form: Form){

  }
  
  register(){
    this.dialog.open(SignupComponent,{width:'990px', height:'550px', hasBackdrop:true, panelClass: 'custom-dialog-container' });
  }
}
