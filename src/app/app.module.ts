import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
