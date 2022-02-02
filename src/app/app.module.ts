import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from "src/environments/environment";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideFirebaseApp, initializeApp } 
from '@angular/fire/app';
import { getAuth, provideAuth } 
from '@angular/fire/auth';
import { getFirestore, provideFirestore } 
from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterEnseignantComponent } from './register-enseignant/register-enseignant.component';
import { RegisterEleveComponent } from './register-eleve/register-eleve.component';
import { FooterComponent } from './footer/footer.component';
import { LoginEnseignantComponent } from './login-enseignant/login-enseignant.component';
import { LoginEleveComponent } from './login-eleve/login-eleve.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ClassCreationFormComponent } from './class-creation-form/class-creation-form.component';
import { CodeEntryComponent } from './code-entry/code-entry.component';
import { StudentClassDetailsComponent } from './student-class-details/student-class-details.component';
import { StudentAdditionComponent } from './student-addition/student-addition.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    RegisterEnseignantComponent,
    RegisterEleveComponent,
    FooterComponent,
    LoginEnseignantComponent,
    LoginEleveComponent,
    ContactComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    ClassDetailsComponent,
    ProfileDetailsComponent,
    ClassCreationFormComponent,
    CodeEntryComponent,
    StudentClassDetailsComponent,
    StudentAdditionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
