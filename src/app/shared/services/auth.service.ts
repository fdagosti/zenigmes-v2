import { Injectable } from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, user, User, UserCredential
} from '@angular/fire/auth';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { doc, query, setDoc, where } from 'firebase/firestore';
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

  async login(email: string, password: string)
    : Promise<any> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email: string, password: string, username: string, role: string, pays: string, ville: string, etablissement: string)
    : Promise<void> {


    const existingUsername = await this.usernameAlreadyExist(username);
    if (existingUsername) {
      return Promise.reject("Le nom d'utilisateur existe déja")
    }

    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    this.updateProfile(credential, username, role, pays, ville, etablissement);


  }

  async usernameAlreadyExist(username: string) {
    const profilesRef = collection(this.afs, "profiles")
    const q = query(profilesRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    console.log("username exists ? ", (querySnapshot.size > 0))
    return querySnapshot.size > 0;
  }

  async updateProfile(credential: UserCredential, username: string, role: string, pays: string, ville: string, etablissement: string) {
    await setDoc(doc(this.afs, "profiles", credential.user.uid), {
      username,
      pays,
      ville,
      etablissement,
      role 
    }); 

  }

  async resetPassword(email: string): Promise<any> {

    // sends reset password email
    await sendPasswordResetEmail(this.auth, email);
  }




}
