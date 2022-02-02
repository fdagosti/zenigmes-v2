import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdditionComponent } from './student-addition.component';

describe('StudentAdditionComponent', () => {
  let component: StudentAdditionComponent;
  let fixture: ComponentFixture<StudentAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAdditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
