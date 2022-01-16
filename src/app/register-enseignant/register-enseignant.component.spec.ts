import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEnseignantComponent } from './register-enseignant.component';

describe('RegisterEnseignantComponent', () => {
  let component: RegisterEnseignantComponent;
  let fixture: ComponentFixture<RegisterEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEnseignantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
