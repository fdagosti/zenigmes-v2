import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { arrayUnion, collection, collectionData, doc, docData, Firestore, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';
import { ClassesService } from './classes.service';

const FAKE_MAIL_DOMAIN = "FAKEDOMAIN-ZENIGMES.IO"

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  eleves$

  constructor(
    public afs: Firestore,
    public auth: Auth,
    private classes: ClassesService
  ) { 
    const eleveRef = collection(this.afs, "profiles-eleves")
    this.eleves$ = collectionData(eleveRef,{ idField: 'uid' })
  }

  async register(nom: string, prenom: string, username: string, password: string, classId: string)
    : Promise<void> {

    const existingUsername = await this.usernameAlreadyExist(username);
    if (existingUsername) {
      return Promise.reject("Le nom d'utilisateur existe déja")
    }

    const email = username + "@" + FAKE_MAIL_DOMAIN

    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    await this.classes.addStudentToClassroom(classId, [credential.user.uid])

    return this.updateProfile(credential, nom, prenom, username);
  }

  
  private async updateProfile(credential: UserCredential, nom: string, prenom: string, username: string) {
    return setDoc(doc(this.afs, "profiles-eleves", credential.user.uid), {
      nom,
      prenom,
      username,
    });
  }

  private async usernameAlreadyExist(username: string) {
    const profilesRef = collection(this.afs, "profiles-eleves")
    const q = query(profilesRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  }

  async login(username: string, password: string)
    : Promise<any> {

    const email = username + "@" + FAKE_MAIL_DOMAIN

    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  getEleves(){
    return this.eleves$;
  }

}
