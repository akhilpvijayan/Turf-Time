import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../shared/interface/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  registerForm : User = new User;

  constructor(public dialogRef: MatDialogRef<SignupComponent>) { }
  onSubmit(form: Form){

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
