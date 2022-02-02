import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';
import { ClassesService } from '../classes.service';
import { EleveService } from '../eleve.service';

@Component({
  selector: 'app-student-addition',
  templateUrl: './student-addition.component.html',
  styleUrls: ['./student-addition.component.scss']
})
export class StudentAdditionComponent implements OnInit {

  error: any = null;

  @Input() classroom: any;

  eleves$;

  formDetails: any;

  constructor(
    public activeModal: NgbActiveModal,
    public eleves: EleveService,
    private classRoomService: ClassesService
  ) {
    this.eleves$ = this.eleves.getEleves().pipe(
      tap(eleves => this.formDetails = this.toFormGroup(eleves))
    )
  }

  ngOnInit(): void {

  }

  toFormGroup(eleves: any[]) {
    const group: any = {};
    eleves.forEach(({uid}) => {
      const presentInClass = this.classroom.students.find((student:any) => student.uid === uid);
      group[uid] = new FormControl({value: presentInClass, disabled: presentInClass});
    });
    return new FormGroup(group);
  }

  onSubmit() {
    const usernameToAdd = this.getFormValue(this.formDetails)
    this.classRoomService.addStudentToClassroom(this.classroom.id, usernameToAdd).then(
      success => this.activeModal.close('Success'),
      failure => this.error = failure
    )
    
  }

  getFormValue(form_group: FormGroup): any {
    return Object.keys(form_group.value)
      .map(key => ({ uid: key, value: form_group.value[key] }))
      .filter(obj => obj.value)
      .map(obj => obj.uid)
  }


}
