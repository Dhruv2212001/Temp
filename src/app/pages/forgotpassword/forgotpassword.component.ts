import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordService } from 'src/app/service/forgot-password.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, loginForm: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = loginForm && loginForm.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private forgotpasswordSrv: ForgotPasswordService,
    private toastr: ToastrService,
    private ngtoast:NgToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  matcher = new MyErrorStateMatcher();
  get f() {
    return this['forgotPasswordForm'].controls
  }

  submitForgotPassword(): void {
    if (this.forgotPasswordForm.valid) {
      debugger
      this.forgotpasswordSrv.forgotPassword(this.forgotPasswordForm.value.email, this.forgotPasswordForm.value).subscribe((res) => {
        console.log(res)
        this.ngtoast.success({detail:'SUCCESS', summary:`Password Changed request is sent on ${this.forgotPasswordForm.value.email}. Please Check your email`, duration:5000})
        // this.toastr.success(`Password Changed request is sent on ${this.forgotPasswordForm.value.email}. Please Check your email`, 'Success!', {
        //   positionClass: 'toast-center-center',
        //   timeOut: 3000,

        // });
        this.router.navigate(['resetpassword'])

        // console.log('Forgot password form submitted with email:', email);
      }, error => {
        // this.toastr.error(error.error.message, 'Error!');
        this.ngtoast.error({detail:'Error', summary: error.error.message , duration:5000})

      })
    }
  }
}


