import { AfterContentInit, AfterViewInit, Component, ElementRef, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { format } from 'date-fns';
import { AuthService } from 'src/app/service/auth.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { LeaveServiceService } from 'src/app/service/leave-service.service';
import Swal from 'sweetalert2';
const defaultDialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-leave1',
  templateUrl: './leave1.component.html',
  styleUrls: ['./leave1.component.css']
})
export class Leave1Component implements OnInit, AfterViewInit {
  submitted = false;
  leaveForm: FormGroup
  employeeArray: any[] = [];
  isChecked = false;
  days: boolean = false; 
  Role: any[]; 
  // dataSource1: any;
  displayedColumns = ['id', 'fromDate', 'toDate', 'reason', 'Status' ,'Action'];
  dataSource: any = new MatTableDataSource;
  clickedRows = new Set<Element>();
  config = {
    disableClose: true,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '30%',
    height: 'auto',
    minWidth: '',
    minHeight: '',
    maxWidth: defaultDialogConfig.maxWidth,
    maxHeight: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },


  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('viewLeaveForm') viewLeaveForm: TemplateRef<any>;

  constructor(private dialog: MatDialog,
    private service: EmployeeService,
    private leaveSrv:LeaveServiceService,
    private authSrv:AuthService) { }

  ngOnInit(): void {
    this.leaveForm = new FormGroup({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      LeaveRequests: new FormControl('',  [Validators.required]),
      isFullDay: new FormControl('' , []),
      // isMultipleDay: new FormControl('',[])
      // isChecked: new FormControl(true , [Validators.requiredTrue]),
      
    })
    this.loadAllEmp()
    this.GetAllLeave()
    
      this.getRole()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  changeValidators(){
    // if(this.isChecked == true){
    //   this.leaveForm.get('toDate').enable();
    // } else {
    //   this.leaveForm.get('toDate').disable();
    // }
    
   
  }
  get f() {
    return this['leaveForm'].controls
  }
  MultiDay(){
    !this.isChecked==this.isChecked
    if(this.isChecked == true){  
      this.leaveForm.get('toDate').enable();
    } else {
      this.leaveForm.get('toDate').disable();
    }
    console.log(this.isChecked)

  }
  HalfFullDay(){
    this.days=!this.days
    console.log(this.days)
  }
  loadAllEmp() {
    this.service.GetCustomer().subscribe((res: any) => {
      this.dataSource = res
      if (res) {
        // this.dialog.closeAll()
      } else {
        // this.dialog.open()
      }
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })
  }
  GetAllLeave(){
    this.leaveSrv.getAllLeave().subscribe((res)=>{
      this.dataSource = res
    })
  }

  CreateLeave(id:any){
    debugger
   
  }
  onSubmit() {
    debugger
    this.submitted = true;
    if (this.leaveForm.invalid) {
      return;
    } else {
      this.leaveSrv.CreateEmployeesLeave(this.leaveForm.value).subscribe((res: any) => {
        // if (this.leaveForm.valid) {
        //   // alert("success fully data submitted")
        //   this.GetAllLeave()
        //   this.leaveForm.reset()
        // }
        if(res){
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
      
          });
          Toast.fire({
            icon: "success",
            title: "Leave request Added successfully"
          });
          this.GetAllLeave()
          this.leaveForm.reset()
        }

      })
    }
  }

  openpopup(templateRef) {
    let dialogRef = this.dialog.open(templateRef, this.config);
    dialogRef.disableClose = true;
  
    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();

      this.leaveForm.reset();

    })
  }

  // onDelete(id: any) {
  //   debugger
  //   this.service.deleteLeave(id).subscribe((res: any) => {
  //     if (res) {
  //       this.loadAllEmp()
  //     }

  //   })
  // }
  // onDelete(id: any) {
  //   debugger
  //   this.leaveSrv.DeleteEmp(id).subscribe((res: any) => {
  //     if (res) {
  //       this.GetAllLeave()
  //     }

  //   })
  // }
  onDelete(id: any) {
    debugger;
    Swal.fire({
        title: 'Are you sure you want to delete this record?',
        // text: 'You won\'t be able to revert this!',
        // text: 'After you delete this record you will not able to get this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        width: '20%',
        heightAuto: false,
    }).then((result) => {
        if (result.isConfirmed) {
            this.leaveSrv.DeleteEmp(id).subscribe((res: any) => {
              this.GetAllLeave();
         
                    this.GetAllLeave();
                    Swal.fire({
                       title :'Deleted!',
                       text: 'Your record has been deleted.',
                       icon: 'success',
                       heightAuto: false,
                       width: '20%',
                    });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Cancelled',
            text: 'Your record is safe :)',
            icon: 'error',
            heightAuto: false,
            width: '20%',
            position: 'center',
        })
    }
})
}

  applyFilter(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;

  }
  // onReset() {

  //   this.leaveForm.reset();
  // }
  closepopup(){

    this.leaveForm.reset();
  }

  getRole() {
    this.authSrv.roleForUsers().subscribe((res: any[]) => {
      console.log(res);
      this.Role = res.filter(role => role.userName.toLowerCase() === 'bapuhr' || role.userName.toLowerCase() === 'jaivikmanager');
      console.log(this.Role);
      
    });
  }

  onRoleSelectionChange(selectedRole: any) {
    debugger
    const selectedUserId = selectedRole?.userId;
    const  leaveRequest={
      appliedTo:selectedUserId,
      appliedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    }
    this.leaveForm.patchValue({
      LeaveRequests:leaveRequest
    })
  
  }
}



