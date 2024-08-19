import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachhomeService {

  private baseUrl = 'http://localhost:8080/bookings';

  constructor(private http:HttpClient) { }

  schedules() : Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}


