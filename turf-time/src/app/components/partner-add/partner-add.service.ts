import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartnerAddService {
  constructor(private firestore: AngularFirestore) {}

  getStatesData(): Observable<any[]> {
    var states = this.firestore.collection('States').snapshotChanges();
    return states;
  }

  getDistrictsData(): Observable<any[]> {
    var states = this.firestore.collection('Districts').snapshotChanges();
    return states;
  }
}
