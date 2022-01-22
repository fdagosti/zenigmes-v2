import { Injectable } from '@angular/core';

import {
  Auth,
  signOut,
  signInWithPopup,
  user,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  getAdditionalUserInfo,
  OAuthProvider,
  linkWithPopup,
  unlink,
  updateEmail,
  updatePassword,
  User,
  reauthenticateWithPopup,
  authState,
  onAuthStateChanged
} from '@angular/fire/auth';


import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { lastValueFrom, Observable, take } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data
  user$: Observable<User | null>;

  constructor(
    public afs: Firestore,   // Inject Firestore service
    public auth: Auth, // Inject Firebase auth service
    public router: Router,  
  ) { 

    this.user$ = user(auth);
  
  }

  async getUser(): Promise<User | null> {
    return await lastValueFrom(this.user$.pipe(take(1)));
  }
  
  async emailLogin(email: string, password: string)
  : Promise<any> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }
  
  async emailSignUp(email: string, password: string)
  : Promise<void> {
  
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    await updateProfile(
      credential.user, { displayName: credential.user.displayName }
    );
    await sendEmailVerification(credential.user);
  
  }
  
  async resetPassword(email: string): Promise<any> {
  
    // sends reset password email
    await sendPasswordResetEmail(this.auth, email);
  }




}
