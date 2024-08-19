import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router : Router) { }
  ngOnInit(){}
  
  joinAsCoach() {
    this.router.navigate(['/signup/coaches'])
  }

  joinAsUser() {
    this.router.navigate(['/signup/users'])
  }

  loginAsCoach() {
    this.router.navigate(['/login/coaches'])
  }

  loginAsUser() {
    this.router.navigate(['/login/users'])
  }
}
