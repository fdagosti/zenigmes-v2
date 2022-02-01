import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  constructor(private afs: Firestore) { }

  getEnseignantDetails(user_id: string) {
    return docData(doc(this.afs, 'profiles', user_id))
  }
}
