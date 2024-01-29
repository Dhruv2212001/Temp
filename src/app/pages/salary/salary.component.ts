import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/service/employee.service';
const defaultDialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('viewSalaryForm') viewSalaryForm: TemplateRef<any>;
  salaryArray: any[] = [];
  // salaryForm: any;
  salaryForm!: any;
  employeeArray: any[] = [];
  route_id: any
  disable: boolean = false;
  displayedColumns = ['id', 'empname', 'salaryDate', 'salaryAmount', 'Action'];
  dataSource: any = new MatTableDataSource;
  clickedRows = new Set<Element>();
  config = {
    disableClose: true,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: 'auto',
    height: '50%',
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


  get f() {
    return this['salaryForm'].controls;
  };


  constructor(private empSrv: EmployeeService, http: HttpClient , private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.salaryForm = new FormGroup({
      empname: new FormControl('', [Validators.required,]),
      salaryDate: new FormControl('', [Validators.required]),
      salaryAmount: new FormControl('', [Validators.required]),
    })

    this.loadAllEmp()
    this.getAllSalary()
  }
  
  loadAllEmp() {
    debugger
    this.empSrv.getAllEmployee().subscribe((res: any) => {
      this.dataSource = res

    })
  }
  getAllSalary() {
     
    debugger
    this.empSrv.getAllSalary().subscribe((res: any) => {
      this.salaryArray = res
    })
  }

  employeeNameData(event: any) {
    console.log(event)
    let employeeId = event.srcElement.value
    console.log(this.dataSource)
    this.dataSource.forEach(element => {
      if (element.id == employeeId) {
        this.salaryForm.patchValue({
          salaryAmount: element.salary
        })
      }
    });

  }

  submitForm() {
    this.empSrv.createSalary(this.salaryForm.value).subscribe((res: any) => {
      !this.salaryForm.valid
      if (res) {
        this.loadAllEmp();
        alert(res.message);
        this.salaryForm.reset();
      } else {
        alert(res.message)
      }
    })
    this.getAllSalary()

    }
  
  // submitForm() {

  //   if (this.salaryForm.invalid) {
  //     return;
  //   } else {
  //     this.empSrv.createSalary(this.salaryForm.value).subscribe((res: any) => {
  //       if (this.salaryForm.valid) {
  //         // alert("success fully data submitted")
  //         this.dialog.closeAll()
  //         this.loadAllEmp()
  //         this.salaryForm.reset()

  //       }

  //     })
  //   }
  // }


  // onSave() {
  //   this.empSrv.createSalary(this.salaryForm.value).subscribe((res: any) => {
  //     !this.salaryForm.valid
  //     if (res) {
  //       this.loadAllEmp();
  //       alert(res.message);
  //       this.salaryForm.reset();
  //     } else {
  //       alert(res.message)
  //     }
  //   })
  //   this.getAllSalary()

  // }
  // onUpdate(id: any){
  //   debugger
  //   this.empSrv.updateEmpId(this.salaryForm.value , id).subscribe((data:any)=>{
  //     debugger

  //     if (data) {
  //       this.loadAllEmp();
  //       alert(data.message);
  //       this.salaryForm.reset();
  //     } else {
  //       alert(data.message)
  //     }
  //   })

  // }


  onUpdate() {
    this.empSrv.updateEmpId(this.salaryForm.value, this.route_id).subscribe((res: any) => {
      if (res) {
        console.log(res)
        this.getAllSalary();
        this.salaryForm.reset();
        this.route_id = null
      } else {

      }
    })
  }
  onReset() {
    this.salaryForm.reset()
  }

  onDelete(id: any) {
    this.empSrv.deleteEmpid(id).subscribe((res: any) => {
      if (res) {
        this.getAllSalary()
      }

    })

  }

  onEdit(id: any) {
    this.route_id = id
    this.empSrv.getSalaryId(id).subscribe((data: any) => {
      console.log(data)
      data.forEach((element: any) => {
        if (element.id == this.route_id) {
          debugger
          this.salaryForm.patchValue({
            // id : element.id,
            empname: element.empname,
            salaryDate: element.salaryDate,
            salaryAmount: element.salaryAmount
          })
        }

      })
    })
  }

  applyFilter(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;

  }
  onReset1() {

    this.salaryForm.reset();
  }
  closepopup(){

    this.salaryForm.reset();
  }
  openpopup(templateRef) {
    let dialogRef = this.dialog.open(templateRef, this.config);
    dialogRef.disableClose = true;
  
    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();

      this.salaryForm.reset();

    })
  }

}

