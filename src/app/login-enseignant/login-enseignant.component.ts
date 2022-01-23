import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-enseignant',
  templateUrl: './login-enseignant.component.html',
  styleUrls: ['./login-enseignant.component.scss']
})
export class LoginEnseignantComponent implements OnInit {

  error: any = null;

  formDetails = this.fb.group(
    {
      email: ["", Validators.email],
      password: ["", [Validators.required]],
    })

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  
  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("submitting form ", this.formDetails)
    const email = this.formDetails.get("email")?.value;
    const password = this.formDetails.get("password")?.value;
    this.auth.login(email, password).then(
      success => { },
      (error: any) => this.error = error);
  }

  ERROR_MSG:any = {
    "auth/user-not-found": "Utilisateur non trouvé",
    "auth/wrong-password": "Mauvais mot de passe"
  }

  getError(error: any){
    if (error.code){
         return this.ERROR_MSG[error.code]
    }else {
      return error
    }
  }

}
