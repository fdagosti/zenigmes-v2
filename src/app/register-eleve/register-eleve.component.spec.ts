import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEleveComponent } from './register-eleve.component';

describe('RegisterEleveComponent', () => {
  let component: RegisterEleveComponent;
  let fixture: ComponentFixture<RegisterEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
