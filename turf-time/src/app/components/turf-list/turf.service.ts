import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurfService {

    constructor(private firestore: AngularFirestore) {}

    getAllTurfs(): Observable<any[]> {
        var states = this.firestore.collection('TurfDetails').snapshotChanges();
        return states;
    }
}