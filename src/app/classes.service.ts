import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, documentId, Firestore, getDoc, query, where } from '@angular/fire/firestore';
import { deleteDoc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { map, Observable, switchMap } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  classes$: Observable<DocumentData | null>

  constructor(private afs: Firestore, private auth: AuthService) {

    const user$ = this.auth.getUser()
    this.classes$ = user$.pipe(
      switchMap((user: any) => {
        const classRef = collection(this.afs, "classes")
        const q = query(classRef, where("teacher", "==", user.uid));
        const request$ = collectionData(q, { idField: "id" });
        return request$.pipe(
          map(classRooms => {
            return classRooms.map(classRoom => ({ ...classRoom, teacher: `${user.prenom} ${user.nom}` }))
          })
        )
      })
    )
  }

  async createClasse(className: string) {
    let colRef = collection(this.afs, "classes");
    let uid = this.auth.currentUser()?.uid;
    addDoc(colRef, {
      className,
      teacher: uid
    });

  }

  getCurrentUserClassroomsObs() {
    return this.classes$;
  }

  async deleteClass(classroom: any) {
    let docRef = doc(this.afs, 'classes', classroom.id)
    deleteDoc(docRef)
  }

  async getClassroom(code: string) {
    const docRef = doc(this.afs, "classes", code)
    return getDoc(docRef);
  }

}

