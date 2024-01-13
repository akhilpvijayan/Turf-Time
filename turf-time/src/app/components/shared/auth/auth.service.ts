import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../interface/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; 
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private firestore: AngularFirestore
  ) {

  }

   // Sign in with email/password
   signIn(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.afAuth.authState.subscribe((user) => {
            if (user) {
              this.setUser(user).subscribe((res: any) => {
                observer.next(user); // Emit user details
                observer.complete(); // Complete the observable
              });
            }
          });
        })
        .catch((error) => {
          observer.error(error.message); // Emit error message
          observer.complete(); // Complete the observable
        });
    });
  }

  setUser(user: any): Observable<any> {
    return this.getUsers().pipe(
      map((res: any) => {
        const data = res.map((e: any) => {
          const d = e.payload.doc.data();
          if (d.userId === user.uid) {
            localStorage.setItem('user', JSON.stringify(d));
            return true;
          } else {
            localStorage.setItem('user', 'null');
            return false;
          }
        });
        return data; // Assuming you want to return the array of results.
      })
    );
  }

  getUsers(): Observable<any[]> {
    var states = this.firestore.collection('Users').snapshotChanges();
    return states;
  }

  registerUser(email: string, password: string): Promise<string> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential: any) => {
        return userCredential.user.uid;
      })
      .catch((error) => {
        throw error;
      });
  }

  addUser(userDetails: User): Promise<string>{
    return this.firestore.collection('Users').add(userDetails)
      .then((userCredential: any) => {
        return userCredential;
      })
      .catch((error) => {
        throw error;
      });
  }
}
