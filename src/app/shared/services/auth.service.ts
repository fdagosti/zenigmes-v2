import { Injectable } from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, user, User, UserCredential
} from '@angular/fire/auth';
import { collection, docData, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { doc, DocumentData } from 'firebase/firestore';
import { catchError, combineLatest, forkJoin, lastValueFrom, map, observable, Observable, of, switchMap, take, tap } from 'rxjs';





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

          const enseignant_profile = docData(doc(this.afs, 'profiles', uid));
          const eleve_profile = docData(doc(this.afs, 'profiles-eleves', uid));

          return combineLatest([enseignant_profile, eleve_profile]).pipe(
            map(([profileEnseignant, profileEleve]) => ({
              username: "l'inconnu du nord",
              prenom: "John",
              nom: "Doe",
              ...profileEnseignant,
              ...profileEleve,
              email,
              displayName,
              uid, 
              eleve: profileEleve != undefined,
              enseignant: profileEnseignant != undefined,
            }))
          ) as Observable<any>
        }
        return of(null);
      }
      ),
    );
  }

  currentUser() {
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

  async register(nom: string, prenom: string, email: string, password: string, username: string, pays: string, ville: string, etablissement: string)
    : Promise<void> {


    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const user = credential.user;

    this.updateProfile(credential, nom, prenom, username, pays, ville, etablissement).then(() => this.router.navigate(["/"]));;
  }

  async updateUser(changeObject: any, uid: string) {
    await setDoc(doc(this.afs, "profiles", uid), changeObject, { merge: true });
  }

  async updateProfile(credential: UserCredential, nom: string, prenom: string, username: string, pays: string, ville: string, etablissement: string) {
    await setDoc(doc(this.afs, "profiles", credential.user.uid), {
      nom,
      prenom,
      username,
      pays,
      ville,
      etablissement,
    });

  }

  async resetPassword(email: string): Promise<any> {
    // sends reset password email
    await sendPasswordResetEmail(this.auth, email);
  }




}
