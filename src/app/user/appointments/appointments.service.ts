import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private apiUrl = 'http://localhost:8080/bookings'; 

  constructor(private http: HttpClient) { }

  appointment(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  rescheduleAppointment(bookingId: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${bookingId}`, data);
  }

  cancel(bookingId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${bookingId}`);
  }


}
