import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-enseignant',
  templateUrl: './register-enseignant.component.html',
  styleUrls: ['./register-enseignant.component.scss']
})
export class RegisterEnseignantComponent implements OnInit {

  formDetails = this.formBuilder.group({})

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("submitting form")
  }

}
