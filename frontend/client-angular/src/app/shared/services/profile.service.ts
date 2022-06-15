import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private db: AngularFirestore) {}

  getSingleUser(key: string) {
    return this.db.collection('users').doc(key).valueChanges();
  }

  updateUserProfile(key: string, first: string, last: string, phone: string) {
    return this.db.collection('users').doc(key).update({
      firstName: first,
      lastName: last,
      phoneNumber: phone,
    });
  }
}
