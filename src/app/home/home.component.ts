import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent implements OnInit {
  menuType:any
  users:any=[];
  constructor(private route:Router, private apiSrv:ApiService){}
  isLoginError = new EventEmitter<boolean>(false)

  ngOnInit(): void {
    debugger
    this.apiSrv.getEmployee().subscribe((res:any)=>{
      this.users = res
    })
   
  }


}
