import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachprofileService {

  private baseUrl ='http://localhost:8080/coaches';

  constructor(private http : HttpClient) { }

  viewDetails(coachId:string) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${coachId}`);
  }
}
