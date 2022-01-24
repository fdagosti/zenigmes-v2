import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private afs: Firestore) { }

  async createClasse(className: string) {
    console.log("creating a class ")
    
  }
}

