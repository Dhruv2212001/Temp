import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { ToastrService } from 'ngx-toastr';



export const authGuard: CanActivateFn = (route, state) => {
  debugger
  const authService = inject(AuthService)
  if (localStorage.getItem('token')) {
    return true
  } else {
    const toaster = inject(ToastrService)
    
    const router = inject(Router)
    router.navigate(['login'])

    return false
  }
  

};
