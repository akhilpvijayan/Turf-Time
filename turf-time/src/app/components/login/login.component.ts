import { AuthService } from './../shared/auth/auth.service';
import { SignupComponent } from './../signup/signup.component';
import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Login } from '../shared/interface/login';
import { User } from '../shared/interface/signup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn: boolean = false;
  loggedInDetails: any;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  initalizeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
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
        }
      );
  }

  register() {
    const dialogRef: MatDialogRef<SignupComponent> = this.dialog.open(
      SignupComponent,
      {
        width: '990px',
        height: '550px',
        hasBackdrop: true,
        panelClass: 'custom-dialog-container',
      }
    );
    dialogRef.afterClosed().subscribe((result: any) => {
      if(result.userName){
        this.isLoggedIn = true;
        this.loggedInDetails = result;
        this.dialogRef.close(this.loggedInDetails);
      }
    });
  }
}
