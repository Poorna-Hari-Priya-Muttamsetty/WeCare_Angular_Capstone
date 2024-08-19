import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http : HttpClient) { }

  register(role :string, data:any): Observable<any> {
    console.log('${this.baseUrl)${role}');
    return this.http.post<any>(`${this.baseUrl}/${role}`, data);
  }
}
