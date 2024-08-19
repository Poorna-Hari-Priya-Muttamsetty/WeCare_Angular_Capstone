import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { UserprofileService } from './userprofile.service';
import constants from '../../../assets/constant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userDetails: any;

  constructor(
    private userprofileService: UserprofileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.viewDetails();
  }

  viewDetails(): void {
    // const userId = this.route.snapshot.paramMap.get('id');
    const userId = '1';
    if (userId) {
      this.userprofileService.viewDetails(userId).subscribe({
        next: (response) => {
          this.userDetails = response;
        },
        error: (error) => {
          console.error('Failed to load user details', error);

        }
      });
    }
  }

  goBack(): void {
    window.history.back();
  }


}
