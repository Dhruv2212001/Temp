import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements  OnChanges {
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Input() flag: boolean;
  @Input() subMenuState; //new
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  sideBarFlag: boolean = false
  closesideBarFlag: boolean = true
  showFirst: boolean = true;
  public role: string = "";
  // menuType:any;
  menuType: String = "default";
  showMenu = true;
  constructor(private route:Router, private userStoreSrv: UserStoreService,
    private authSrv: AuthService){}
  isLoginError = new EventEmitter<boolean>(false)


  ngOnChanges(){
    console.log("inside ngOnChanges with subMenuState: ",this.subMenuState );
    this.showMenu = !this.subMenuState;
  }

  ngOnInit(): void {

    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('token') || val.url.includes('token')){
          console.log("in Home Area")
          this.menuType='token'
        }else{
          console.log("in Login Area")
          this.menuType='default'
        }
      }
    })

    this.userStoreSrv.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.authSrv.getRoleFromToken();
      console.log(roleFromToken)
      this.role = val || roleFromToken
    })
  }
  mouseenter() {
    if (!this.subMenuState) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.subMenuState) {
      this.isShowing = false;
    }
  }
  addNewItem(value: boolean) {
    this.showFirst = !this.showFirst
    this.newItemEvent.emit(value);
  }
  closeTab(value: boolean) {
    this.showFirst = !this.showFirst
    this.newItemEvent.emit(value);
  }
}
