import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/service/employee.service';
import { Leave1Component } from '../leave1/leave1.component';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent {
  leaveForm: FormGroup
  employeeArray: any[] = [];
  LeaveArray:any[] = [];
  disable: boolean = false;

  // selectedDate: any[{}]

  selectDropdown: any[] = [{
    id : "1",
    Leavename: "Hospital"
  },
  {
    id : "2",
    Leavename: "Attending Fuction"
  },
  {
    id : "3",
    Leavename: "Marriage Leave"
  }
]
get f() {
  return this['leaveForm'].controls;
};
  route_id: any;

  constructor(private empSrv: EmployeeService , private dialog: MatDialog) {
  }
  


  ngOnInit(): void {
    this.leaveForm = new FormGroup({
      id: new FormControl(''),
      startDate: new FormControl('',  [Validators.required]),
      endDate: new FormControl('',  [Validators.required]),
      leaveReason: new FormControl('', [Validators.required]),
      leavetype: new FormControl('',[Validators.required]),

      
    })
    this.getAllLeave()
    this.loadAllEmp()
    // this.getAllSalary()
  }



  loadAllEmp(){
    this.empSrv.getAllEmployee().subscribe((res:any)=>{
      this.employeeArray = res
      
    })
  }

  getAllLeave(){
    this.empSrv.getAllLeave().subscribe((res:any)=>{
      this.LeaveArray = res
    })
  }

  
  onDelete(id : any){
    this.empSrv.deleteLeave(id).subscribe((res:any)=>{
      if(res){
        this.getAllLeave()
      }
     
    })
  }

  onEdit(id: any) {
    this.route_id = id
    this.empSrv.getLeaveId(id).subscribe((res:any)=>{
      console.log(res)
     
      res.forEach((element:any)=>{
        if(element.id == this.route_id)
        this.leaveForm.patchValue({
          empname: element.empname,
          startDate: element.startDate,
          endDate: element.endDate,
          leaveReason : element.leaveReason,
          leavetype : element.leavetype
        })
      })
    })

  }

  onSave() {
      this.empSrv.createLeave1(this.leaveForm.value).subscribe((res: any) => {
        !this.leaveForm.valid
        if (res) {
          this.loadAllEmp();
          alert(res.message);
          this.leaveForm.reset();
        } else {
          alert(res.message)
        }
      })
      this.getAllLeave() 
  
    }

    onUpdate(){
      this.empSrv.updateLeaveId(this.leaveForm.value, this.route_id).subscribe((res:any)=>{
        if (res) {
          console.log(res)
          this.getAllLeave();
          this.leaveForm.reset();
          this.route_id = null
        } else {
      
        }
      })
    }
    onSubmit(){
      if(this.leaveForm.valid){
        this.disable = true
      }

    }

}
