import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AppointmentsService } from './appointments.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  selectedAppointment: any = null;
  rescheduleForm: FormGroup;
  userId!: string;

  constructor(
    private appointmentsService: AppointmentsService,
    private fb: FormBuilder,
    private route : ActivatedRoute
  ) {
    this.rescheduleForm = this.fb.group({
      appointmentDate: ['', [Validators.required, this.upcomingSevenDaysValidator()]],
      slot: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.userId = this.route.snapshot.paramMap.get('id') ?? '';
    this.userId = '1';
    this.appointment();
  }

  appointment(): void {
    this.appointmentsService.appointment().subscribe(
      (data) => {
        this.appointments = data.filter(appointment => appointment.userId === this.userId);
      },
      (error) => {
        console.error('Failed to load appointments', error);
      }
    );
  }

  rescheduleAppointment(): void {
    if (this.rescheduleForm.valid && this.selectedAppointment) {
      const { appointmentDate, slot } = this.rescheduleForm.value;
      this.appointmentsService.rescheduleAppointment(this.selectedAppointment.id, { appointmentDate, slot }).subscribe(
        (response) => {
          alert('Appointment rescheduled successfully.');
          this.appointment(); // Refresh the list
          this.selectedAppointment = null;
        },
        (error) => {
          console.error('Failed to reschedule appointment', error);
        }
      );
    }
  }

  cancel(appointmentId: string): void {
    if (confirm('Are you sure you need to cancel the appointment?')) {
      this.appointmentsService.cancel(appointmentId).subscribe({
        next : (response) => {
          alert('Appointment cancelled successfully.');
          this.appointment();
        },
        error : (error) => {
          console.error('Failed to cancel appointment', error);
        }
    });
    }
  }

  private upcomingSevenDaysValidator() {
    return (control: AbstractControl) => {
      const currentDate = new Date();
      const selectedDate = new Date(control.value);
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(currentDate.getDate() + 7);

      if (selectedDate >= currentDate && selectedDate <= sevenDaysFromNow) {
        return null;
      } else {
        return { upcomingSevenDays: true };
      }
    };
  }

  goBack() {
    window.history.back();
  }
}

function dateCalculator(fc: FormControl) {

}
