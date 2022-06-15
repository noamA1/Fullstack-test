import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.userData = this.afAuth.authState;
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          localStorage.setItem('user', JSON.stringify(result.user));
          JSON.parse(localStorage.getItem('user')!);
          this.router.navigate(['/']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
  ) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserDataByEmailAndPassword(
          result.user,
          firstName,
          lastName,
          role
        );
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SetUserDataByEmailAndPassword(
    user: any,
    first: string,
    last: string,
    role: string
  ) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      firstName: first,
      lastName: last,
      userRole: role,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user;
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    userRef.update({
      uid: user.uid,
      email: user.email,
    });
  }
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}