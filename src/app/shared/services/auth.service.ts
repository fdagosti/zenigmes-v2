import { Injectable } from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, user, User, UserCredential
} from '@angular/fire/auth';
import { collection, docData, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { doc, DocumentData } from 'firebase/firestore';
import { lastValueFrom, map, observable, Observable, of, switchMap, take, tap } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$: Observable<User | null>;

  constructor(
    public afs: Firestore,   // Inject Firestore service
    public auth: Auth, // Inject Firebase auth service
    public router: Router,
  ) {

    this.user$ = user(auth).pipe(
      switchMap((userData: User | null) => {
        if (userData) {
          const email = userData.email;
          const displayName = userData.displayName;
          const uid = userData.uid;

          return docData(doc(this.afs, 'profiles', uid)).pipe(
            map((profileData) => { return { username: "l'inconnu du nord", prenom: "John", nom: "Doe", ...profileData, email, displayName, uid } })
          ) as Observable<any>
        }
        return of(null);
      }
      ),
    );
  }

  currentUser(){
    return this.auth.currentUser;
  }

  getUser(): Observable<any> {
    return this.user$;
  }

  async login(email: string, password: string)
    : Promise<any> {
    return await signInWithEmailAndPassword(this.auth, email, password).then(() => this.router.navigate(["/"]));
  }

  async logout() {
    return await signOut(this.auth).then(() => this.router.navigate(["/"]));
  }

  async register(nom: string, prenom: string, email: string, password: string, username: string, role: string, pays: string, ville: string, etablissement: string)
    : Promise<void> {


    const existingUsername = await this.usernameAlreadyExist(username);
    if (existingUsername && false) {
      return Promise.reject("Le nom d'utilisateur existe déja")
    }

    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const user = credential.user;

    this.updateProfile(credential, nom, prenom, username, role, pays, ville, etablissement).then(() => this.router.navigate(["/"]));;
  }

  async updateUser(changeObject:any, uid: string){
    await setDoc(doc(this.afs, "profiles", uid), changeObject, {merge: true});
  }

  async usernameAlreadyExist(username: string) {
    const profilesRef = collection(this.afs, "profiles")
    const q = query(profilesRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  }

  async updateProfile(credential: UserCredential, nom: string, prenom: string, username: string, role: string, pays: string, ville: string, etablissement: string) {
    await setDoc(doc(this.afs, "profiles", credential.user.uid), {
      nom,
      prenom,
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
