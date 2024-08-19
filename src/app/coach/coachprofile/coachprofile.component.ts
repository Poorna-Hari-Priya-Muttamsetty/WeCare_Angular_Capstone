import { Component, OnInit } from '@angular/core';
import { CoachprofileService } from './coachprofile.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-coachprofile',
  templateUrl: './coachprofile.component.html',
  styleUrls: ['./coachprofile.component.css']
})
export class CoachprofileComponent implements OnInit {

  coachId : string ='';
  coachDetails! : any;
  msg : string ='';

  constructor(private router:Router, private coachProfileService : CoachprofileService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.coachId = this.route.snapshot.paramMap.get('id') ?? '';
    this.coachId = '1';
    this.viewCoachDetails();
  }

  viewCoachDetails(): void {
    // console.log(this.route.snapshot.paramMap);
    // const coachId = this.route.snapshot.paramMap.get('id');
    if (this.coachId) {
      this.coachProfileService.viewDetails(this.coachId).subscribe({
        next: (response) => {
          this.coachDetails = response;
        },
        error: (error) => {
          console.error('Failed to load user details', error);
        }
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
