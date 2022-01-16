import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEleveComponent } from './login-eleve.component';

describe('LoginEleveComponent', () => {
  let component: LoginEleveComponent;
  let fixture: ComponentFixture<LoginEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
