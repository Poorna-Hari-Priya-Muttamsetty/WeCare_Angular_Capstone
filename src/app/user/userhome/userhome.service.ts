import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserhomeService {

  private coachesUrl = 'http://localhost:8080/coaches';
  private bookingsUrl = 'http://localhost:8080/bookings';

  constructor(private http: HttpClient) {}

  allcoaches(): Observable<any[]> {
    return this.http.get<any[]>(this.coachesUrl);
  }

  confirmAppointment(appointmentDetails: any): Observable<any> {
    return this.http.post<any>(this.bookingsUrl, appointmentDetails);
  }

}
