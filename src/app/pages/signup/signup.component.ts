import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { signup } from 'src/app/data-type';
import { AuthService } from 'src/app/service/auth.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent  implements OnInit{
  authError:string = '';
  signupForm: FormGroup;
  roleUser: any;
  get f() {
    return this['signupForm'].controls;
  };
  // userForm!: FormGroup;
    role= [
      "Admin",
      "Employee",
      "Manager",
      "HR"
    ]

  constructor(private router:Router,
    private employeeService:EmployeeService,
    private formbuilder: FormBuilder,
    private authSrv:AuthService,
    private toastr: ToastrService){
  
  }
  
  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      username    : ['', [Validators.required, Validators.minLength(2), noWhitespaceValidator]],
      email       :new FormControl('', [Validators.required, Validators.email]),
      password    :new FormControl('',[Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{8,30})')  ]),
      passwordRep :new FormControl('',Validators.required),
      },
      {
        validators: this.Mustmatch('password', 'passwordRep')
     })
     function noWhitespaceValidator(control: FormControl) {
        const isSpace = (control.value || '').match(/\s/g);
        return isSpace ? {'whitespace': true} : null;
    }
     
    
  }
  Mustmatch(password: any, passwordRep: any) {
    return (formgroup: FormGroup) => {
      const passwordcontrol = formgroup.controls[password];
      const con_passwordcontrol = formgroup.controls[passwordRep];

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

  getControl(name:any) : AbstractControl | null {
    return this.signupForm.get(name)
  }

  selectedRole(event){
    this.roleUser = event.target.value
  }
  
RegisterForm(): void{ 
   debugger

    this.authSrv.signUp(this.signupForm.value, this.roleUser).subscribe((res)=>{
      console.log(res)
      this.toastr.success("Registration Completed Successfully", 'Success!');
      this.router.navigate(['/login'])
    },
    error =>{
      this.toastr.error(error.error.message, 'Error!');
    })
}

openLogin(){
  this.router.navigate(['login'])

}

}
