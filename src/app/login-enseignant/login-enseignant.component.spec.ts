import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEnseignantComponent } from './login-enseignant.component';

describe('LoginEnseignantComponent', () => {
  let component: LoginEnseignantComponent;
  let fixture: ComponentFixture<LoginEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEnseignantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
