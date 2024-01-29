import { trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAttendance, attendance } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendanceArray: IAttendance[] = [];
  attendanceObj: attendance = new attendance();
  attendanceForm: any;
  employeeArray: any[] = [];
  submitted: false | undefined;
  route_id: any;
 // attendanceForm!:any
  disable: boolean = false
  get f() {
    return this['attendanceForm'].controls;
  };


  constructor(private empSrv: EmployeeService, private http: HttpClient) {

  }
  
  ngOnInit(): void {
    this.attendanceForm = new FormGroup({
      employeeId: new FormControl(''),
      empname: new FormControl('', [Validators.required]),
      attendanceDate: new FormControl('', [Validators.required]),
      inTime: new FormControl('', [Validators.required]),
      outTime: new FormControl('', [Validators.required]),
      isFullDay: new FormControl(true , [Validators.requiredTrue]),
    })
    this.getEmployee();
    this.loadAllAttendance()
  }

  loadAllAttendance() {
    this.http.get("http://localhost:3000/attendance").subscribe((res: any) => {
      this.attendanceArray = res
    })
  }
  getEmployee() {
    debugger
    this.empSrv.getAllEmployee().subscribe((res: any) => {

      this.employeeArray = res
    })
  }



  onReset() {
    this.submitted = false;
    this.attendanceForm.reset();
  }
  onEdit(id: any) {
    debugger
    this.route_id = id
    this.empSrv.getEmpId(id).subscribe((res:any)=>{
      console.log(res)
     
      res.forEach((element:any)=>{
        if(element.id == this.route_id)
        this.attendanceForm.patchValue({
          empname: element.empname,
          attendanceDate: element.attendanceDate,
          inTime : element.inTime,
          outTime : element.outTime,
          isFullDay : element.isFullDay
        })
      })
    })

  }

  onUpdate(){
    debugger
    this.empSrv.updateEmp(this.attendanceForm.value, this.route_id).subscribe((res:any)=>{
      if (res) {
        console.log(res)
        this.loadAllAttendance();
        this.attendanceForm.reset();
        this.route_id = null
      } else {
    
      }
    })
  }


  onDelete(id: any) {
    this.empSrv.deleteEmpBy(id).subscribe((data: any) => {
      if (data) {
        this.loadAllAttendance();

      }
    })
  }
  submitForm() {

  }
  onSave() {
    this.empSrv.createAttendance(this.attendanceForm.value).subscribe((res: any) => {
      if (res) {
        this.loadAllAttendance();
        this.attendanceForm.reset(); 
        
        this.attendanceForm.patchValue({
          isFullDay:true
        })      
      } else {
      }
    })
  }
}
