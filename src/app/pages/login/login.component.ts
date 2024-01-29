import { HttpClient } from '@angular/common/http';
import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { signup } from '../../data-type';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserStoreService } from 'src/app/service/user-store.service';
import { NgToastService } from 'ng-angular-popup';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, loginForm: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = loginForm && loginForm.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showLogin = false;
  // authError: string = '';
  menuType: string = 'seller';
  loginForm: FormGroup;
  showPassword = true;
  leaveForm: FormGroup;
  hide = true;
  username = ""

  @ViewChild('viewForgotForm') viewForgotForm: TemplateRef<any>;
  constructor(private router: Router,
    private empSrv: EmployeeService,
    private authSrv: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ngtoast:NgToastService) {
    // this.setupBeforeUnloadListener();
    //   window.onunload = function() {
    //     localStorage.clear();
    //     return ''
    // }


  }

  get f() {
    return this['loginForm'].controls;
  };
  ngOnInit(): void {
    this.empSrv.reloadSeller()
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2), noWhitespaceValidator]),
      password: new FormControl('', [Validators.required]),
    })


    // this.loadAllEmp() 
    function noWhitespaceValidator(control: FormControl) {
      const isSpace = (control.value || '').match(/\s/g);
      return isSpace ? { 'whitespace': true } : null;
    }
  }
  matcher = new MyErrorStateMatcher();
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  RegisterForm(data: signup): void {
    console.log(data)

    this.empSrv.userSignUp(data);
  }
  onLogin() {
    debugger
    if (this.loginForm.valid) {
      debugger
      this.authSrv.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.loginForm.reset();

            this.ngtoast.success({detail:'SUCCESS', summary:`We Have Sent an OTP To Your Email ${res.email}`, duration:5000})
            // this.toastr.success(`We Have Sent an OTP To Your Email ${res.email}`, 'Success!');
            this.router.navigate(['otp'])
            localStorage.setItem('user', JSON.stringify(res.userName))

          },
          error: (err) => {
            // alert(err?.error.message)
            if (err) {
              // this.toastr.error('Email or Password is not correct!', 'Error!');
              this.ngtoast.error({detail:'Error', summary:"Email or Password is not correct!" , duration:5000})
            }
          }
        })
    } else {
      this.loginForm.invalid
      // this.toastr.error('Please Enter username And Password!', 'Error!');
      this.ngtoast.error({detail:'Error', summary:"Please Enter username And Password!" , duration:5000})

    }
  }
  // openpopup(templateRef) {
  //   // this.empForm.reset();
  //   // this.router_id = false
  //   let dialogRef = this.dialog.open(templateRef,{
  //     width:'30%',
  //     height:'30%',
  //     position: {top: '3%'} ,
  //     autoFocus: false,
  //     backdropClass: 'userActivationDialog'

  //   });
  //   dialogRef.disableClose = true;

  //   dialogRef.backdropClick().subscribe(_ => {
  //     dialogRef.close();
  //     // this.empForm.reset();

  //   })

  // }
  onSubmit1() {

  }

  onSubmit(data: any) {
    console.log(data)
    // debugger
    // console.log(data)
    // this.empSrv.userLogin(data);
    // this.empSrv.isLoginError.subscribe((isError)=>{
    //     if(isError){
    //       Swal.fire({
    //         title: 'Error!',
    //         text: 'Email or Password is not correct',
    //         icon: 'error',
    //         confirmButtonText: 'Cool'
    //       })
    //       this.menuType ='seller'
    //     }else{
    //       Swal.fire({
    //         title: 'Success!',
    //         text: 'successfully logged in',
    //         icon: 'success',
    //         confirmButtonText: 'Cool',
    //       })
    //       this.menuType ='default'
    //     }
    //     localStorage.setItem('seller',this.menuType);
    // })
  }

  openLogin() {
    this.showLogin = true
  }
  openRegister() {
    this.showLogin = false
    this.router.navigate(['signup'])

  }

}

