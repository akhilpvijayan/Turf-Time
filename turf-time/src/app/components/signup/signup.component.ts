import { AuthService } from './../shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '../shared/interface/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      fullName: ['', Validators.required],
      mobile: [,Validators.required],
      role: [2]
    })
  }

  onSubmit() {
    this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password)
    .then((userId: any) => {
      console.log('User registered successfully. User ID:', userId);
      this.registerForm.value.userId = userId;
      this.authService.addUser(this.registerForm.value).then((res:any) => {
        this.authService.signIn(this.registerForm.value.email,this.registerForm.value.password).subscribe((res: any) => {
          this.dialogRef.close(JSON.parse(localStorage.getItem('user')!));
        })
      });
    })
    .catch((error: any) => {
      console.error('Error registering user:', error.message);
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
