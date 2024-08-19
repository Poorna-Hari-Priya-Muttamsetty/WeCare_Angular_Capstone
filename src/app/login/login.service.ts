import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080';
  
  constructor(private http : HttpClient) { }

  login(role: string, id:number, password : string) : Observable<any> {
    const url = `${this.baseUrl}/${role}/${id}`;
    return this.http.get<any>(url, {params : {password}}).pipe (
      catchError(error => {
        return throwError(() => new Error("Invalid Credentials"));
      })
    )
  } 

}
