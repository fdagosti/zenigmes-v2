import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClassDetailsComponent } from './student-class-details.component';

describe('StudentClassDetailsComponent', () => {
  let component: StudentClassDetailsComponent;
  let fixture: ComponentFixture<StudentClassDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentClassDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
