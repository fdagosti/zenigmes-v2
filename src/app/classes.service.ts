import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, documentId, Firestore, getDoc, query, where } from '@angular/fire/firestore';
import { deleteDoc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';
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
        const enseignantQuery = query(classRef, where("teacher", "==", user.uid));
        const eleveQuery = query(classRef, where("students", "array-contains", user.uid));
        const request$ = collectionData(
          user.enseignant ? enseignantQuery : eleveQuery,
          { idField: "id" }
        );
        return request$.pipe(
          switchMap(classRooms => {
            if (classRooms.length == 0) return of([]);

            return combineLatest(classRooms.map((classroom: any) => {
              const students$ = classroom.students ? combineLatest(classroom.students?.map((student: any) => docData(doc(this.afs, "profiles-eleves", student)))) : of([])
              
              const teacher$ = docData(doc(this.afs, 'profiles', classroom.teacher))

              return combineLatest([students$, teacher$]).pipe(
                map(([students, teacher]: any) => ({ ...classroom, teacher, students })),
              )
            }))
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

