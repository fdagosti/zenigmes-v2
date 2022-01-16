import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {

  constructor(){
    document.body.style.backgroundImage = "url(https://images.unsplash.com/photo-1484417894907-623942c8ee29?dpr=1&auto=format&fit=crop&w=1080&h=608&q=80&cs=tinysrgb&crop=)";
    document.body.style.backgroundPosition = "top";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.body.style.backgroundImage = "none";
  }

}
