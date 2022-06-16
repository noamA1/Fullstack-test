import { User } from './../../models/user';
import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { elementAt, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  role: string = '';
  constructor(private db: AngularFirestore, public ngZone: NgZone) {}

  getSingleUser(key: string) {
    return this.db.collection('users').doc(key).valueChanges();
  }

  setUserRole(key: string) {
    return this.db
      .collection('users')
      .doc(key)
      .get()
      .subscribe((user: any) => {
        this.ngZone.run(() => {
          localStorage.setItem('userRole', user.data().userRole);
        });
      });
  }

  updateUserProfile(key: string, first: string, last: string, phone: string) {
    return this.db.collection('users').doc(key).update({
      firstName: first,
      lastName: last,
      phoneNumber: phone,
    });
  }
}
