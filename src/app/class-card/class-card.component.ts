import { Component, Input, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassesService } from '../classes.service';
import { StudentAdditionComponent } from '../student-addition/student-addition.component';

@Component({
  selector: 'app-class-card',
  templateUrl: './class-card.component.html',
  styleUrls: ['./class-card.component.scss']
})
export class ClassCardComponent implements OnInit {

  @Input() classe: any;

  faTimes = faTimes;
  public isCollapsed = true;

  constructor(
    private classRooms: ClassesService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  deleteClass(classroom: any) {
    this.classRooms.deleteClass(classroom)
  }

  addStudentsToClassroom(classroom: any) {
    const modalRef = this.modalService.open(StudentAdditionComponent);
    modalRef.componentInstance.classroom = classroom;
  }

  deleteStudentFromClassroom(classroom: any, student:any){
    this.classRooms.deleteSudentFromClassroom(classroom.id, [student.uid])
  }

}
