import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EleveAuthService } from '../eleve-auth.service';

@Component({
  selector: 'app-login-eleve',
  templateUrl: './login-eleve.component.html',
  styleUrls: ['./login-eleve.component.scss']
})
export class LoginEleveComponent implements OnInit {

  error: any = null;

  formDetails = this.fb.group(
    {
      username: ["", Validators.required],
      password: ["", [Validators.required]],
    })

  constructor(private fb: FormBuilder, private auth: EleveAuthService) { }


  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("submitting form ", this.formDetails)
  }

}
