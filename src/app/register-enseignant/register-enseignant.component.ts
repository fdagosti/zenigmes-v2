import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseError } from 'firebase/app';
import { AuthService } from '../shared/services/auth.service';
import data from './etablissements.json';


function passwordMatchValidator(g: FormGroup) {
  return g.get('password')?.value === g.get('confirmPassword')?.value
    ? null : { 'mismatch': true };
}

@Component({
  selector: 'app-register-enseignant',
  templateUrl: './register-enseignant.component.html',
  styleUrls: ['./register-enseignant.component.scss']
})
export class RegisterEnseignantComponent implements OnInit {

  error: any = null;

  ETABLISSEMENTS: any = data;

  formDetails = this.fb.group(
    {
      nom: [""],
      prenom: [""],
      email: ["", Validators.email],
      passwordGroup: this.fb.group({
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      }, { validator: passwordMatchValidator } as AbstractControlOptions),
      country: [""],
      town: [""],
      etablissement: [""],
    })

  @ViewChild('merci') confirmationMsg: ElementRef | null = null;



  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("submitting form ", this.formDetails)
    const nom = this.formDetails.get("nom")?.value;
    const prenom = this.formDetails.get("prenom")?.value;
    const email = this.formDetails.get("email")?.value;
    const password = this.formDetails.get("passwordGroup")?.get("password")?.value;
    const pays = this.formDetails.get("country")?.value;
    const ville = this.formDetails.get("town")?.value;
    const etablissement = this.formDetails.get("etablissement")?.value;

    this.auth.register(nom, prenom, email, password, "", pays, ville, etablissement).then(
      success => {
        console.log("success ")
        this.modalService.open(this.confirmationMsg).result.then((result) => {}, (reason) => {});
      },
      (error: any) => this.error = error)
  }


  get email() {
    return this.formDetails.get("email");
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

  getCountries() {
    return Object.keys(this.ETABLISSEMENTS);
  }

  getVilles(country: any) {
    if (!country) return [];
    return Object.keys(this.ETABLISSEMENTS[country]);

  }

  getEtablissements(country: any, ville: any) {
    if (!country || !ville) return [];
    return this.ETABLISSEMENTS[country][ville];
  }

  getSelectedCountry(): any {
    let result = this.formDetails.get("country")?.value
    return result
  }

  getSelectedVille(): any {
    let result = this.formDetails.get("town")?.value
    return result
  }
}
