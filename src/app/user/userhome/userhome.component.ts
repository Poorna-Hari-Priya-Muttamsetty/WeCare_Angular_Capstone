import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserhomeService } from './userhome.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})

export class UserhomeComponent implements OnInit {
  coachArray: any[] = [];
  userDetails: any; // Populate with user details if needed
  appointmentDetails: any;
  appointmentForm!: FormGroup;
  selectedCoach: any = null;


  constructor(private userhomeService: UserhomeService,
    private fb: FormBuilder,
    private router: Router) {
      this.appointmentForm = this.fb.group({
        appointmentDate: ['', [Validators.required, this.dateValidator]],
        slot: ['', Validators.required]
      });
    }
  

  ngOnInit() {
    this.allcoaches();
  }

  allcoaches(): void {
    this.userhomeService.allcoaches().subscribe({
      next: (response) => {
        this.coachArray = response;
      },
      error: (error) => {
        console.error('Error fetching coaches:', error);
      }
    });
  }
  confirmAppointment(coachId: string): void {
    if (this.appointmentForm.valid) {
      this.appointmentDetails = {
        coachId,
        ...this.appointmentForm.value
      };
      this.userhomeService.confirmAppointment(this.appointmentDetails).subscribe({
        next: (response) => {
          alert('Your Appointment is Scheduled Successfully');
          this.appointmentForm.reset();
        },
        error: (error) => {
          console.error('Error confirming appointment:', error);
        }
      });
    }
  }

  selectCoach(coach: any) {
    this.selectedCoach = coach;
    this.appointmentForm.reset(); 
  }

  dateValidator(control: FormControl): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    const daysDifference = (selectedDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);

    if (daysDifference < 0 || daysDifference > 7) {
      return { invalidDate: true };
    }
    return null;
  }
  
}

