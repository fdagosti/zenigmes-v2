import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCreationFormComponent } from './class-creation-form.component';

describe('ClassCreationFormComponent', () => {
  let component: ClassCreationFormComponent;
  let fixture: ComponentFixture<ClassCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassCreationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
