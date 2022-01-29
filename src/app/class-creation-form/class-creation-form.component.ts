import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassesService } from '../classes.service';

@Component({
  selector: 'app-class-creation-form',
  templateUrl: './class-creation-form.component.html',
  styleUrls: ['./class-creation-form.component.scss']
})
export class ClassCreationFormComponent implements OnInit {

  faPlus = faPlus;

  closeResult = '';

  formDetails = this.fb.group(
    {
      className: ["", [Validators.required]],
    })


  constructor(
    private fb: FormBuilder, 
    private modalService: NgbModal,
    private classRooms: ClassesService) { }

  ngOnInit(): void {
  }

  open(passwordContent: any, summaryContent: any) {
    console.log("open with content", passwordContent)
    this.modalService.open(passwordContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.classRooms.createClasse(this.formDetails.get("className")?.value).then(() => this.modalService.open(summaryContent))
      
    }, (reason) => {
    });
  }
}
