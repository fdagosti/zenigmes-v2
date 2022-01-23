import { Component, OnInit } from '@angular/core';
import { faSchool, faUser } from '@fortawesome/free-solid-svg-icons';
import { Md5 } from 'ts-md5';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService) { }

  user: any;

  faSchool = faSchool;
  faProfile = faUser;

  ngOnInit(): void {
    
  }

  gravatarUrl(email:any){
    const emailHash = Md5.hashStr(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${emailHash}`
  }



}
