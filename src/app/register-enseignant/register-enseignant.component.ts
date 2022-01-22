import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import data from './etablissements.json';
@Component({
  selector: 'app-register-enseignant',
  templateUrl: './register-enseignant.component.html',
  styleUrls: ['./register-enseignant.component.scss']
})
export class RegisterEnseignantComponent implements OnInit {

 ETABLISSEMENTS: any = data;

  formDetails = this.fb.group(
    {
      nom: "",
      prenom: "",
      username: "",
      email: ["", Validators.email],
      passwordGroup: this.fb.group({
        password: "",
        confirmPassword: ""
      }),
      country: "",
      town: "",
      etablissement: ""
    })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("submitting form ",this.formDetails)
  }

  get email(){
    return this.formDetails.get("email");
  }

  getCountries(){
    return Object.keys(this.ETABLISSEMENTS);
  }

  getVilles(country: any){
    console.log("get ville ", country)
    if (!country) return [];
    return Object.keys(this.ETABLISSEMENTS[country]);

  }

  getEtablissements(country:any, ville:any){
    console.log("get etablissement ", country, ville)
    if (!country || !ville) return [];
    return this.ETABLISSEMENTS[country][ville];
  }

  getSelectedCountry(): any{
    let result = this.formDetails.get("country")?.value
    console.log("slected country ", result)
    return result
  }

  getSelectedVille(): any{
    let result = this.formDetails.get("town")?.value
    console.log("slected ville ", result)
    return result
  }

}
