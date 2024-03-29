import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import data from '../register-enseignant/etablissements.json';

function passwordMatchValidator(g: FormGroup) {
  return g.get('password')?.value === g.get('confirmPassword')?.value
    ? null : { 'mismatch': true };
}

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  success = false

  user$: Observable<any>

  dbUSer: any

  formDetails = this.fb.group(
    {
      nom: [""],
      prenom: [""],
      username: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}, Validators.email],
      passwordGroup: this.fb.group({
        password: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [{value: '', disabled: true}, Validators.required],
      }, { validator: passwordMatchValidator } as AbstractControlOptions),
      country: [""],
      town: [""],
      etablissement: [""],
    })



  constructor(private fb: FormBuilder, public auth: AuthService) { 
    this.user$ = this.auth.getUser().pipe(
      tap(userData => {
        this.formDetails.get("nom")?.setValue(userData.nom)
        this.formDetails.get("prenom")?.setValue(userData.prenom)
        this.formDetails.get("username")?.setValue(userData.username)
        this.formDetails.get("email")?.setValue(userData.email)
        this.formDetails.get("country")?.setValue(userData.pays)
        this.formDetails.get("town")?.setValue(userData.ville)
        this.formDetails.get("etablissement")?.setValue(userData.etablissement)
        this.dbUSer = userData;
      }));
  }

  ngOnInit(): void {

  }

  onSubmit(){
    let changeObject:any = {}
    if (this.formDetails.get("nom")?.value != this.dbUSer.nom) changeObject.nom = this.formDetails.get("nom")?.value
    if (this.formDetails.get("prenom")?.value != this.dbUSer.prenom) changeObject.prenom = this.formDetails.get("prenom")?.value
    if (this.formDetails.get("country")?.value != this.dbUSer.pays) changeObject.pays = this.formDetails.get("country")?.value
    if (this.formDetails.get("town")?.value != this.dbUSer.ville) changeObject.ville = this.formDetails.get("town")?.value
    if (this.formDetails.get("etablissement")?.value != this.dbUSer.etablissement) changeObject.etablissement = this.formDetails.get("etablissement")?.value

    if (Object.keys(changeObject).length >0){
      this.auth.updateUser(changeObject, this.dbUSer.uid).then(() => {this.success = true})
    }
  }

  ETABLISSEMENTS: any = data;

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

  close(alert: any){
    console.log("closing alerts ",alert)
  }

}
