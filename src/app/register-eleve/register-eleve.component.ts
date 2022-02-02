import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, map, Observable, switchMap } from 'rxjs';
import { ClassesService } from '../classes.service';
import { EleveService } from '../eleve.service';
import { EnseignantService } from '../enseignant.service';

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

  error: any = null;

  classContext: Observable<any>;

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
    private router: Router,
    private classrooms: ClassesService,
    private enseignant: EnseignantService,
    private eleve: EleveService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {

    this.classContext = this.route.params.pipe(
      map(params => params["code"]),
      switchMap((code: string) => from(this.classrooms.getClassroom(code)).pipe(
        map(dbObject => dbObject.data() as any),
        map(classroomData => ({...classroomData, code}))
      )),
      switchMap(classroomData => this.enseignant.getEnseignantDetails(classroomData.teacher).pipe(
        map(teacher => ({ ...teacher, ...classroomData })))
      )
    );
  }

  @ViewChild('merci') confirmationMsg: ElementRef | null = null;

  ngOnInit(): void {
  }

  onSubmit(context: any): void {
    console.log("submitting form ", this.formDetails, context)

    const nom = this.formDetails.get("nom")?.value;
    const prenom = this.formDetails.get("prenom")?.value;
    const username = this.formDetails.get("username")?.value;
    const password = this.formDetails.get("passwordGroup")?.get("password")?.value;

    this.eleve.register(nom, prenom, username, password, context.code).then(
      success => {
        console.log("success ")
        this.router.navigate(["/"])
        this.modalService.open(this.confirmationMsg).result.then((result) => { }, (reason) => { });
      },
      (error: any) => this.error = error)

  }


  get pwdGroup(): FormGroup {
    return this.formDetails.get("passwordGroup") as FormGroup;
  }

  get pwd() {
    return this.formDetails.get("passwordGroup")?.get("password");
  }

  get pwdCf() {
    return this.formDetails.get("passwordGroup")?.get("confirmPassword");
  }

}
