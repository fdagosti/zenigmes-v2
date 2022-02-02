import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { ClassesService } from '../classes.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {

  classGroups$;

  constructor(
    private classRooms: ClassesService,
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

  trackByIndex(index:any, classe:any){
    return index;
  }

  trackByClassId(index:any, classe:any){
    return classe.id
  }

}
