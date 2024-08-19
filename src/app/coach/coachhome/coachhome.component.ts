import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoachhomeService } from './coachhome.service';
import { CoachprofileService } from '../coachprofile/coachprofile.service';

@Component({
  selector: 'app-coachhome',
  templateUrl: './coachhome.component.html',
  styleUrls: ['./coachhome.component.css']
})
export class CoachhomeComponent implements OnInit {

  imgUrl :string = '';
  scheduleDetails : any[] = []
  msg!:string

  constructor(private router :Router, private coachHomeSerive : CoachhomeService) {}

  ngOnInit() : void {
    this.loadSchedules();
  }

  loadSchedules() : void {
    this.coachHomeSerive.schedules().subscribe ({
      next : (response) => {
        this.scheduleDetails = response || [];
        if(this.scheduleDetails.length === 0) {
          this.imgUrl = "/assets/Images/Notepad_icon.svg.png";
          this.msg = 'No Schedules fixed yet.';
        }
      },
      error: (error) => { this.msg = 'Failed to load schedules. Please try again'}
    })
  }
}

