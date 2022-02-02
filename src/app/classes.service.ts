import { Injectable } from '@angular/core';
import { addDoc, arrayUnion, collection, collectionData, doc, documentId, Firestore, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { arrayRemove, deleteDoc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from './shared/services/auth.service';


export enum NIVEAUX_ECOLE {
  "CP" = "CP",
  "CE1" = "CE1",
  "CE2" = "CE2",
  "CM1" = "CM1",
  "CM2" = "CM2",
  "6EME" = "6ème",
  "5EME" = "5ème",
  "4EME" = "4ème",
  "3EME" = "3ème",
  "2NDE" = "Seconde",
  "TERM" = "Terminale",
  "PREM" = "Première",
}

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
              classroom.niveau = this.fromStringToNiveau(classroom.niveau);
              const students$ = classroom.students ?
                combineLatest(classroom.students?.map((student: any) => docData(doc(this.afs, "profiles-eleves", student), { idField: 'uid' })))
                : of([])

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

  fromStringToNiveau(niveau:string):NIVEAUX_ECOLE {
    return (<any>NIVEAUX_ECOLE)[niveau];
  }

  async createClasse(className: string, niveau: NIVEAUX_ECOLE) {
    let colRef = collection(this.afs, "classes");
    let uid = this.auth.currentUser()?.uid;
    addDoc(colRef, {
      className,
      teacher: uid,
      niveau
    });

  }

  getCurrentUserClassroomsObs() {
    return this.classes$;
  }

  async deleteClass(classroom: any) {
    let classRef = doc(this.afs, 'classes', classroom.id)
    deleteDoc(classRef)
  }

  async getClassroom(code: string) {
    const classRef = doc(this.afs, "classes", code)
    return getDoc(classRef);
  }

  async addStudentToClassroom(classId: string, students: string[]) {
    const classRef = doc(this.afs, "classes", classId);
    return updateDoc(classRef, {
      students: arrayUnion(...students)
    });
  }

  async deleteSudentFromClassroom(classId: string, students: string[]){
    const classRef = doc(this.afs, "classes", classId);
    return updateDoc(classRef, {
      students: arrayRemove(...students)
    });
  }

}

