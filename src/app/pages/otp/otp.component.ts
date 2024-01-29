import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  otpForm: FormGroup;
  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;
  @ViewChild('input5') input5: ElementRef;
  @ViewChild('input6') input6: ElementRef;
  user: any;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  constructor(private formBuilder: FormBuilder,
    private authSrv: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private userStore: UserStoreService,
    private ngtoast:NgToastService) {
    this.user = localStorage.getItem('user')
    console.log('user', this.user);

    this.createForm();
  }

  createForm() {
    this.otpForm = this.formBuilder.group({
      input1: ['', Validators.required],
      input2: ['', Validators.required],
      input3: ['', Validators.required],
      input4: ['', Validators.required],
      input5: ['', Validators.required],
      input6: ['', Validators.required]
    });
  }
  keyUpEvent(event, index) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }

  }
  submitOTP() {
    debugger
    // this.otpForm.controls.value

    if (this.otpForm.valid) {
      const otpValues = Object.keys(this.otpForm.controls).map(key => this.otpForm.controls[key].value);
      const enteredOTP = otpValues.join('');

      // Implement logic to handle OTP submission and validation
      console.log('Entered OTP:', enteredOTP);
      let code = Number(enteredOTP)
      let username: string = this.user;

      // If the username is wrapped in double quotes, remove them
      if (username?.startsWith('"') && username?.endsWith('"')) {
        username = JSON.parse(username);
      }

      const payload = {
        username: username,
        code: code
      };
      console.log(payload);

      debugger
      this.authSrv.otp(payload)
        .subscribe({
          next: (res) => {
            debugger
            this.otpForm.reset();
            localStorage.setItem('token', JSON.stringify(res.token))
            // this.toastr.success('OTP Verified Successfully', 'Success!');
            this.ngtoast.success({detail:'SUCCESS', summary:"OTP Verified Successfully", duration:3000})

            var tokenPayload = this.authSrv.decodeToken();
            console.log(tokenPayload)
            this.userStore.setFullNameForstore(tokenPayload.name);
            this.userStore.setRoleForStore(tokenPayload.role);

            this.router.navigate(['dashboard'])
          },
          error: (err) => {
            debugger
            // alert(err?.error.message)
            if (err) {
              // this.toastr.error("The OTP you've entered is incorrect.Please try again", 'Error!');
              this.ngtoast.error({detail:'Error', summary:"The OTP you've entered is incorrect.Please try again" , duration:5000})


            }
          }
        })
      // Add your logic to verify the OTP
    } else {
      // Handle invalid form submission or incomplete OTP
      console.log('Please enter a valid OTP');
    }
  }
}
