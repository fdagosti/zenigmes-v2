import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      username: [""],
      email: ["", Validators.email],
      passwordGroup: this.fb.group({
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      }, { validator: passwordMatchValidator } as AbstractControlOptions),
      country: [""],
      town: [""],
      etablissement: [""],
    })



  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("submitting form ", this.formDetails)
    const nom = this.formDetails.get("nom")?.value;
    const prenom = this.formDetails.get("prenom")?.value;
    const email = this.formDetails.get("email")?.value;
    const password = this.formDetails.get("passwordGroup")?.get("password")?.value;
    const username = this.formDetails.get("username")?.value;
    const role = "enseignant"
    const pays = this.formDetails.get("country")?.value;
    const ville = this.formDetails.get("town")?.value;
    const etablissement = this.formDetails.get("etablissement")?.value;

    this.auth.register(nom, prenom, email, password, username, role, pays, ville, etablissement).then(
      success => { },
      (error: any) => this.error = error)
  }


  get email() {
    return this.formDetails.get("email");
  }

  get pwdGroup() {
    return this.formDetails.get("passwordGroup");
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
