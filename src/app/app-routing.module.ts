import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { LandingComponent } from './landing/landing.component';
import { LoginEleveComponent } from './login-eleve/login-eleve.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterEleveComponent } from './register-eleve/register-eleve.component';
import { RegisterEnseignantComponent } from './register-enseignant/register-enseignant.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'register-enseignant', component: RegisterEnseignantComponent },
  { path: 'register-eleve/:code', component: RegisterEleveComponent },
  { path: 'login-eleve', component: LoginEleveComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
