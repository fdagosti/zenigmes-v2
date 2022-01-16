import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterEleveComponent } from './register-eleve/register-eleve.component';
import { RegisterEnseignantComponent } from './register-enseignant/register-enseignant.component';

const routes: Routes = [
  { path: 'register-enseignant', component: RegisterEnseignantComponent },
  { path: 'register-eleve', component: RegisterEleveComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
