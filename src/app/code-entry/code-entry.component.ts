import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassesService } from '../classes.service';
import { EleveAuthService } from '../eleve-auth.service';

@Component({
  selector: 'app-code-entry',
  templateUrl: './code-entry.component.html',
  styleUrls: ['./code-entry.component.scss']
})
export class CodeEntryComponent implements OnInit {

  public isCollapsed = true;

  error: any = null;

  formDetails = this.fb.group({
    code: ["", [Validators.required]],
  })

  @Output() closeEvent = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private classRooms: ClassesService,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const code = this.formDetails.get("code")?.value;
    this.classRooms.getClassroom(code).then(classroom => {
      if (classroom.exists()) {
        console.log("it worked, let's navigate to registration ", classroom.exists())
        this.closeEvent.emit("true");
        this.router.navigate(["/register-eleve", code])

      } else {
        this.error = "Code non Valide"
      }
    },
      failure => {
        this.error = failure
      })
  }

}
