
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, loginForm: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = loginForm && loginForm.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  hide = true;
  fullName:string
  constructor(private formBuilder: FormBuilder,
    private authSrv: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private userStoreSrv:UserStoreService,
    private ngtoast:NgToastService) { }

  ngOnInit(): void {
    const newLocal = this;
    // let userName = localStorage.getItem('user');
    // let userName1 = userName.replace(/"/g, '');
    // console.log(userName)

    this.userStoreSrv.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.authSrv.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
  
  
    })
    newLocal.changePasswordForm = this.formBuilder.group({
      userName: [this.fullName, [Validators.required]],
      oldPassword: ['', [Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{8,30})')]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]],

    }, {
      validators: this.Mustmatch('newPassword', 'confirmNewPassword')
    })
  }



  matcher = new MyErrorStateMatcher();
  get f() {
    return this['changePasswordForm'].controls
  }
  Mustmatch(newPassword: any, confirmNewPassword: any) {
    return (formgroup: FormGroup) => {
      const passwordcontrol = formgroup.controls[newPassword];
      const con_passwordcontrol = formgroup.controls[confirmNewPassword];

      if (con_passwordcontrol.errors && !con_passwordcontrol.errors['Mustmatch']) {
        return;

      }
      if (passwordcontrol.value !== con_passwordcontrol.value) {
        con_passwordcontrol.setErrors({ Mustmatch: true });
      } else {
        con_passwordcontrol.setErrors(null);

      }
    }
  }
  onSubmit() {
    debugger
    console.log(this.changePasswordForm.value)
    this.authSrv.changePassword(this.changePasswordForm.value).subscribe((res) => {
      console.log(res)
      debugger
      if (res) {
        // const Toast = Swal.mixin({
        //   toast: true,
        //   position: "top-end",
        //   showConfirmButton: false,
        //   timer: 3000,
         
        // });
        // Toast.fire({
        //   icon: "success",
        //   title: "Password Updated Successfully"
        // });
        this.ngtoast.success({detail:'SUCCESS', summary: "Password Changed Successfully", duration:4000})
        localStorage.clear()
        this.router.navigate(['login'])
      }

    },error => {
      // this.toastr.error(error.error.message, 'Error!');
      this.ngtoast.error({detail:'Error', summary: error.error.message , duration:4000})
    })
  }
}



