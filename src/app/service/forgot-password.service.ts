import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http:HttpClient) { }
  
  forgotPassword(email:any ,data:any):Observable<any>{
    debugger
    return this.http.post(`http://localhost:5066/api/Authentication/forgot-password?email=${email} `, data);
  }
  NewPassword(code:any ,data:any):Observable<any>{
    debugger
    return this.http.post(`http://localhost:5066/api/Authentication/Forgot-password-validate?code=${code} `, data);
  }
}
