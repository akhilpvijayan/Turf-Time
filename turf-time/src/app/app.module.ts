import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { SignupComponent } from './components/signup/signup.component';
import {MatIconModule} from '@angular/material/icon';
import { TurfListComponent } from './components/turf-list/turf-list.component';
import { TurfDetailsComponent } from './components/turf-list/turf-details/turf-details.component';
import { PartnerAddComponent } from './components/partner-add/partner-add.component';
import { PartnerAddedDialogComponent } from './components/partner-add/partner-added-dialog/partner-added-dialog.component';
import { BookingComponent } from './components/turf-list/turf-details/booking/booking.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    TurfListComponent,
    TurfDetailsComponent,
    PartnerAddComponent,
    PartnerAddedDialogComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBUHxxGzzcuxNKFUA2oco6SXeJKMt4DYNE",
      authDomain: "turftime-745bc.firebaseapp.com",
      projectId: "turftime-745bc",
      storageBucket: "turftime-745bc.appspot.com",
      messagingSenderId: "658149792035",
      appId: "1:658149792035:web:67cc04875c70ce218c1496"
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
