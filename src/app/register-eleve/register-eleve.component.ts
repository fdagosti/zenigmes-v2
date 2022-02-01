import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { ClassesService } from '../classes.service';
import { EnseignantService } from '../enseignant.service';
import { AuthService } from '../shared/services/auth.service';

function passwordMatchValidator(g: FormGroup) {
  return g.get('password')?.value === g.get('confirmPassword')?.value
    ? null : { 'mismatch': true };
}

@Component({
  selector: 'app-register-eleve',
  templateUrl: './register-eleve.component.html',
  styleUrls: ['./register-eleve.component.scss']
})
export class RegisterEleveComponent implements OnInit {

  toto: Observable<any>;

  formDetails = this.fb.group(
    {
      nom: [""],
      prenom: [""],
      username: ["", Validators.required],
      passwordGroup: this.fb.group({
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      }, { validator: passwordMatchValidator } as AbstractControlOptions),
      country: [""],
      town: [""],
      etablissement: [""],
    })

  constructor(
    private route: ActivatedRoute, 
    private classrooms: ClassesService, 
    private enseignant: EnseignantService,
    private fb: FormBuilder
    ) {

    this.toto = this.route.params.pipe(
      map(params => params["code"]),
      switchMap((code: string) => from(this.classrooms.getClassroom(code))),
      map(dbObject => dbObject.data() as any),
      switchMap(classroomData => this.enseignant.getEnseignantDetails(classroomData.teacher).pipe(
        map(teacher => ({ ...teacher, ...classroomData })))
      )
    );
  }



  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("submitting form ", this.formDetails)
  }


  get pwdGroup():FormGroup {
    return this.formDetails.get("passwordGroup") as FormGroup;
  }

  get pwd() {
    return this.formDetails.get("passwordGroup")?.get("password");
  }

  get pwdCf() {
    return this.formDetails.get("passwordGroup")?.get("confirmPassword");
  }

}
