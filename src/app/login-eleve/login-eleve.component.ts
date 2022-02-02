import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EleveService } from '../eleve.service';

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

  constructor(private fb: FormBuilder, private auth: EleveService, private router: Router) { }


  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("submitting form ", this.formDetails)

    const ussername = this.formDetails.get("username")?.value;
    const password = this.formDetails.get("password")?.value;

    this.auth.login(ussername, password).then(() => this.router.navigate(["/"]))
  }

}
