import {TurfDetails } from './../shared/interface/turfDetails';
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

  addTurfForReview(turfDetails: TurfDetails){
    turfDetails.turfId = this.firestore.createId();
    return this.firestore.collection('TurfDetailsTemp').add(turfDetails);
  }

  deleteTurf(turfDetails: TurfDetails){
    return this.firestore.collection('TurfDetailsTemp').doc(turfDetails.turfId).delete();
  }
}
