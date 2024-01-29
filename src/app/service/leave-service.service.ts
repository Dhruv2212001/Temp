import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveServiceService {

  constructor(private http:HttpClient) { }
  getAllLeave():Observable<any>{
    debugger
    return this.http.get("http://localhost:5066/api/Leave")
  }
  CreateEmployeesLeave(obj:any):Observable<any>{
    debugger
    return this.http.post("http://localhost:5066/api/Leave", obj)
  }
  DeleteEmp(id:any):Observable<any>{
    return this.http.delete(`https://localhost:7145/api/Leave/${id}`)
  }
}
