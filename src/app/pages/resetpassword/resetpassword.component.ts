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
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder,
    private forgotpasswordSrv:ForgotPasswordService,
    private toastr: ToastrService,
    private ngtoast:NgToastService,
    private router: Router) { }

  ngOnInit(): void {
    const newLocal = this;
    newLocal.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{8,30})')  ]],
      confirmPassword: ['', [Validators.required]],
      code: ['', [Validators.required]]
    },
    {
      validators: this.Mustmatch('password', 'confirmPassword')
   });
  }
  matcher = new MyErrorStateMatcher();
  get f(){
    return this['resetPasswordForm'].controls
  }
  Mustmatch(password: any, confirmPassword: any) {
    return (formgroup: FormGroup) => {
      const passwordcontrol = formgroup.controls[password];
      const con_passwordcontrol = formgroup.controls[confirmPassword];

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
    if (this.resetPasswordForm.valid) {
      this.forgotpasswordSrv.NewPassword(this.resetPasswordForm.value.code, this.resetPasswordForm.value).subscribe((res)=>{
        console.log(res)

        // this.toastr.success(`Password has been Changed `, 'Success!', {
        //   positionClass: 'toast-center-center',
        //   timeOut: 3000,
        
        // });
        this.ngtoast.success({detail:'SUCCESS', summary:"Password Changed Successfully", duration:4000})
        this.router.navigate(['login'])
          
        // console.log('Forgot password form submitted with email:', email);
      },error =>{
        // this.toastr.error(error.error.message, 'Error!');
        this.ngtoast.error({detail:'Error', summary:"Something went wrong!" , duration:5000})

      })
      }
    }
    }
