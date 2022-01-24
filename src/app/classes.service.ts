import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { deleteDoc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  classes$: Observable<DocumentData | null>

  constructor(private afs: Firestore, private auth: AuthService) { 
    const classRef = collection(this.afs, "classes")
    let uid:any = this.auth.currentUser()?.uid;
    const q = query(classRef, where("teacher", "==", uid));
    const user$ = docData(doc(this.afs, 'profiles', uid));
    const request$ = collectionData(q,{idField: "id"});
    this.classes$ = user$.pipe(
      switchMap((user:any) => {
        return request$.pipe(
          map(classRooms => {
            return classRooms.map(classRoom => ({...classRoom, teacher: `${user.prenom} ${user.nom}`}))
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

  getClassroomsObs(){
    return this.classes$;
  }

  async deleteClass(classroom:any){
    let docRef = doc(this.afs, 'classes', classroom.id)
    deleteDoc(docRef)
  }

}

