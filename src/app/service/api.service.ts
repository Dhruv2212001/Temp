import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  getEmployee():Observable<any>{
    debugger
    return this.http.get("http://localhost:5066/api/Employee")
  }
  getEmployeeById(id:any):Observable<any>{
    
    return this.http.get(`http://localhost:5066/api/Employee/${id}`)
  }
   createEmployee(obj:any, role:string): Observable<any>{
    debugger
    // return this.http.post("http://localhost:5066/api/Employee?role",obj)
    return this.http.post("http://localhost:5066/api/Employee?role=" + role , obj)
  }
  deleteEmpById(id:any , email:any):Observable<any>{
    debugger
    // return this.http.delete(`http://localhost:3002/employee/${id}`)
    return this.http.delete(`http://localhost:5066/api/Employee/${id}?email=${email}`)
  }
  updateEmployee(obj:any, id:any): Observable<any>{
    return this.http.put(`http://localhost:5066/api/Employee/${id}`,obj)
  }
}
