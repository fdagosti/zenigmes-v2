import { Component, OnInit } from '@angular/core';
import { Event, Router, RouterEvent } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isMenuCollapsed = true;

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }

}
