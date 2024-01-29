import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { login, signup } from '../data-type';
import { Router } from '@angular/router';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)

  sharedData: any = null;

  constructor(private http: HttpClient, private router: Router) {}
  


//today

  GetCustomer(): Observable<any>{
    return this.http.get("http://localhost:3005/Leave")
  }
  createLeave1(obj:any):Observable<any>{
    return this.http.post('http://localhost:3005/leave',obj)
    }




  userSignUp(data: any) {
    debugger
    this.http.post('https://192.168.29.150:5000/api/Authentication/Register?role=Admin', data,
      { observe: 'response' }
    ).subscribe((result) => {
      this.router.navigate(['login'])
    });
  
  }

  getAllEmployee(): Observable<any>{
    return this.http.get('http://localhost:3002/employee');
  }
  // createEmployee(obj:any): Observable<any>{
  //   return this.http.post('http://localhost:3002/employee',obj)
  // }
  getEmpById(id:any):Observable<any>{
    return this.http.get('http://localhost:3002/employee?'+id)
  }

  updateEmployee(obj:any, id:any): Observable<any>{
    return this.http.put(`http://localhost:3002/employee/${id}`,obj)
  }
  deleteEmpById(id: any):Observable<any>{
    return this.http.delete(`http://localhost:3002/employee/${id}`)
  }


  // Attendance crud
  createAttendance(obj:any): Observable<any>{
  return this.http.post('http://localhost:3000/attendance',obj)
  }

  deleteEmpBy(id: any):Observable<any>{
    return this.http.delete(`http://localhost:3000/attendance/${id}`)
  }
  getEmpId(id:any):Observable<any>{
    return this.http.get('http://localhost:3000/attendance?'+id)
  }
  updateEmp(obj:any , id:any):Observable<any>{
    return this.http.put(`http://localhost:3000/attendance/${id}`, obj)
  }



  // salary crud

  getAllSalary():Observable<any>{
    return this.http.get('http://localhost:3004/salary')
  }

  createSalary(obj:any):Observable<any>{
    return this.http.post('http://localhost:3004/salary',obj)
    }

  deleteEmpid(id:any):Observable<any>{
    return this.http.delete('http://localhost:3004/salary/' +id)
  }

  getSalaryId(id:any):Observable<any>{
    return this.http.get('http://localhost:3004/salary?'+id)
  }
  updateEmpId(obj:any , id:any):Observable<any>{
    return this.http.put(`http://localhost:3004/salary/${id}`, obj)
  }


  // leave Crud

  
   getAllLeave():Observable<any>{
    return this.http.get('http://localhost:3005/leave')
  }

 createLeave(obj:any):Observable<any>{
    return this.http.post('http://localhost:3005/leave',obj)
    }

  deleteLeave(id:any):Observable<any>{
      return this.http.delete('http://localhost:3005/leave/' +id)
    }

  getLeaveId(id:any):Observable<any>{
      return this.http.get('http://localhost:3005/leave?'+id)
  }
  updateLeaveId(obj:any , id:any):Observable<any>{
    return this.http.put(`http://localhost:3005/leave/${id}`, obj)
  }





  reloadSeller() { 
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['dashboard'])
    }
  }



  userLogin(data: login) {

     console.log(data)
     let body = {
     username :data.username,
     password:data.password
    }
    this.http.post(`https://192.168.29.150:5000/api/Authentication/Login`, body).subscribe((result: any) => {
      console.log(result)
      if (result && result.body) {
        console.log("user is logged in")
        localStorage.setItem('token', JSON.stringify(result.token))
        this.router.navigate(['dashboard'])
      } else {
        console.log("login Failed")
        this.isLoginError.emit(true) 
      }


        

    })



    // console.log(data)
    // this.http.get(`http://localhost:3003/seller?email=${data.email}&password=${data.password}`,
    //   { observe: 'response' }
    // ).subscribe((result: any) => {
    //   console.log(result)
    //   if (result && result.body &&result.body.length) {
    //     console.log("user is logged in")
    //     localStorage.setItem('seller', JSON.stringify(result.body))
    //     this.router.navigate(['dashboard'])
    //   } else {
    //     console.log("login Failed")
    //     this.isLoginError.emit(true) 
    //   }


        

    // })
  }
}
