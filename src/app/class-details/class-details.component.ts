import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {


classGroups = [
  {
    teacher: "UID",
    classId: "6ème Deux",
    classCode: "FQDSFDQ",
    students: [
      {uid: "FDSFDF"},
      {uid: "FDSFDF"},
      {uid: "FDSFDF"},
      {uid: "FDSFDF"},
      {uid: "FDSFDF"},
    ]
  },
  {
    teacher: "UID",
    classId: "1ère 42",
    classCode: "FQDSFDQ",
    students: [
      {uid: "FDSFDF"},
      {uid: "FDSFDF"},
      {uid: "FDSFDF"},
      {uid: "FDSFDF"},
      {uid: "FDSFDF"},
    ]
  },
  {
    teacher: "UID",
    classId: "Terminal S",
    classCode: "FQDSFDQ",
    students: [
      {uid: "FDSFDF"},
      {uid: "FDSFDF"},
      {uid: "FDSFDF"},
      {uid: "FDSFDF"},
      {uid: "FDSFDF"},
    ]
  },
]

groupedArray;

  constructor() { 
    const GRP_SIZE = 2;
    const arr = this.classGroups;
    this.groupedArray = Array.from({ length: Math.ceil(arr.length / GRP_SIZE) }, (v, i) =>
    arr.slice(i * GRP_SIZE, i * GRP_SIZE + GRP_SIZE));
  }

  ngOnInit(): void {
  }

}
