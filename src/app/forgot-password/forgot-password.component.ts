import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  closeResult = '';

  formDetails = this.fb.group({
    email: ["", [Validators.email, Validators.required]],
  })


  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private auth: AuthService) { }

  ngOnInit(): void {
  }

  open(passwordContent: any, summaryContent: any) {
    console.log("open with content", passwordContent)
    this.modalService.open(passwordContent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      const email = this.formDetails.get("email")?.value;
      this.formDetails.reset()
      this.auth.resetPassword(email).then(result => {
        console.log("result ", result);
        this.modalService.open(summaryContent)
      })
    }, (reason) => {
    });
  }
}
