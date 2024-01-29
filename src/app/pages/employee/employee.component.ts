import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Toast } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { EmployeeService } from 'src/app/service/employee.service';
import Swal from 'sweetalert2';
const defaultDialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeArray: any[] = [];
  employeeObj: any
  empForm: any;
  editMode: boolean = false;
  submitted: false | undefined;
  imageSrc: string = '';
  disable: boolean = false;
  config = {
    disableClose: true,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '34%',
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

  // today
  displayedColumns = ['name', 'email', 'mobileNumber', 'city', 'Action'];
  dataSource: any = new MatTableDataSource;
  users: any = [];
  router_id: boolean = false;
  isEditMode: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('viewEmployeeForm') viewEmployeeForm: TemplateRef<any>;
  @ViewChild(MatSort) sort: MatSort;
  editing_id: number;

  get f() {
    return this['empForm'].controls;
  };
//   var form = document.querySelector('#form');
//   var input = document.querySelector('#text');

// form.onsubmit = function(e) {
//   e.preventDefault();
//   text.blur();
// }

  constructor(private empSrv: EmployeeService,
    private dialog: MatDialog,
    private apiSrv: ApiService,
    private _liveAnnouncer: LiveAnnouncer) {
  }
  ngOnInit(): void {
    debugger
    this.empForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      userName: new FormControl('',  this.isEditMode ?[Validators.required] : [] ),
      password: new FormControl('',  this.isEditMode ?[Validators.required]: []),
      // userName: new FormControl('',),
      birthdate: new FormControl('', [Validators.required]),
      joiningDate: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.email),
      mobileNumber: new FormControl('', [Validators.pattern('[6-9]\\d{9}')]),
      bloodGroup: new FormControl('', [Validators.pattern('(A|B|AB|O)[+-]')]),
      city: new FormControl('', [Validators.required]),
      // state: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      organization: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      // status: new FormControl('', [Validators.required]),
      // assignedManager: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      // id: new FormControl(''),
      // file: new FormControl('', [Validators.required])
    })
    this.loadAllEmployee();
    console.log(this.empForm);
    this.loadAllEmployee1()
  }
  
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
 

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }
  loadAllEmployee1() {
    debugger
    this.apiSrv.getEmployee().subscribe((res: any) => {
      this.dataSource = res
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  // editEmployee(data:any){
  //   debugger
  //   this.apiSrv.getEmployee().subscribe((res:any)=>{ 
  //     this.dataSource = res
  //     console.log(data.id)
  // })
  //   console.log(data.id)
  // }

  editEmployee(obj: any) {
    this.router_id = obj
    // debugger
    this.editing_id = obj.id
    this.isEditMode = true;
    this.dialog.open(this.viewEmployeeForm)
    this.apiSrv.getEmployeeById(obj.id).subscribe(res => {
      console.log(res)
      this.empForm.patchValue({
        name: res.name,
        // userName: res.userName,
        // password: res.password,
        birthdate: res.birthdate,
        joiningDate: res.joiningDate,
        email: res.email,
        mobileNumber: res.mobileNumber,
        bloodGroup: res.bloodGroup,
        city: res.city,
        address: res.address,
        gender: res.gender,
        organization: res.organization,
        role: res.role,
        status: res.status,
        assignedManager: res.assignedManager,
        designation: res.designation

      })

    })

  }

  onReset() {
    this.submitted = false;
    this.empForm.reset();
  }
  loadAllEmployee() {
    this.empSrv.getAllEmployee().subscribe((res: any) => {
      this.employeeArray = res
    })
  }
  onSave() {
    debugger
    this.apiSrv.createEmployee(this.empForm.value, 'Employee').subscribe((res: any) => {
      console.log(this.empForm.role)
      if (res) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          // timerProgressBar: true,
          // didOpen: (toast) => {
          //   toast.onmouseenter = Swal.stopTimer;
          //   toast.onmouseleave = Swal.resumeTimer;
          // }
        });
        Toast.fire({
          icon: "success",
          title: "Employee Added successfully"
        });
        this.loadAllEmployee1()
        this.empForm.reset();

      } else {
        alert(res.message)
      }
    })
  }
  // onEdit(id: number) {
  //   debugger
  //   let route_id = id
  //   this.editing_id = id
  //   this.empSrv.getEmpById(id).subscribe(data => {
  //     console.log(data)
  //     data.forEach((element: any) => {
  //       // debugger
  //       if (element.id == route_id) {
  //         this.empForm.patchValue({
  //           id: element.id,
  //           empname: element.empname,
  //           empEmail: element.empEmail,
  //           empcontact: element.empcontact,
  //           altContact: element.altContact,
  //           pincode: element.pincode,
  //           addressLine1: element.addressLine1,
  //           addressLine2: element.addressLine2,
  //           city: element.city,
  //           bankname: element.bankname,
  //           ifsc: element.ifsc,
  //           accountNo: element.accountNo,
  //           bankBranch: element.bankBranch,
  //           state: element.state,
  //           salary: element.salary,
  //           file: element.file,
  //         })
  //       }
  //     }

  //     );

  //   })


  // }
  submitForm() {
    if (this.empForm.valid) {
      this.disable = true
      // this.empForm.reset()
    }

  }

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
    this.empForm.patchValue({
      file: this.imageSrc
    })
  }
  onUpdate(obj: any) {
    debugger
    this.apiSrv.updateEmployee(this.empForm.value, this.editing_id).subscribe((res: any) => {
      if (res) {
        this.loadAllEmployee1();
        // this.empForm.reset();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
        Toast.fire({
          icon: "success",
          title: 'Employee Updated Successfully',
        });
        // this.empForm.patchValue({
        //   file: ''
        // })
      }
    })

  }
  // onUpdate1(id:any) {
  //   debugger
  //   this.apiSrv.updateEmployee(this.empForm.value, id).subscribe((data: any) => {
  //     if (data) {
  //       this.loadAllEmployee();
  //       this.empForm.reset();
  //       // this.empForm.patchValue({
  //       //   file: ''
  //       // })
  //     } else {

  //     }
  //   })

  // }

  // onDelete(id: any) {
  //   debugger
  //   this.apiSrv.deleteEmpById(id).subscribe((data: any) => {
  //     this.loadAllEmployee1()

  //   })
  // }

  onDelete(id: any, email:any) {
    debugger
    Swal.fire({
      title: 'Are you sure you want to delete this record?',
      // text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      width: '20%',
      heightAuto: false,
      // position: 'top',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiSrv.deleteEmpById(id, email).subscribe((res: any) => {
          console.log(res)
          this.loadAllEmployee1();
          Swal.fire({
            title: 'Deleted!',
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
    });
  }

  // today
  applyFilter(data: Event) {
    debugger
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;

  }

  openpopup(templateRef) {
    this.empForm.reset();
    this.router_id = false
    this.isEditMode = false;
    let dialogRef = this.dialog.open(templateRef, this.config);
    dialogRef.disableClose = true;

    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
      this.empForm.reset();

    })

  }

  closepopup() {

    this.empForm.reset();
  }
  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }
}





