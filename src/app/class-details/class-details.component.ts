import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { ClassesService } from '../classes.service';
import { StudentAdditionComponent } from '../student-addition/student-addition.component';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {

classGroups$;
public isCollapsed = true;

  constructor(
    private classRooms: ClassesService,
    private modalService: NgbModal,
    ) { 

    this.classGroups$ = classRooms.getCurrentUserClassroomsObs().pipe(
      map((arr: any) => {
        const GRP_SIZE = 2;
        const groupedArray = Array.from({ length: Math.ceil(arr.length / GRP_SIZE) }, (v, i) =>
        arr.slice(i * GRP_SIZE, i * GRP_SIZE + GRP_SIZE));
        return groupedArray 
      })
    )
  }

  ngOnInit(): void {
  }

  deleteClass(classroom:any){
    this.classRooms.deleteClass(classroom)
  }

  addStudentsToClassroom(classroom:any){
    const modalRef = this.modalService.open(StudentAdditionComponent);
    modalRef.componentInstance.classroom = classroom;
    modalRef.result.then((result) => {console.log("successful addition ",result) }, (reason) => {console.log("failure ",reason) });
  }

}
