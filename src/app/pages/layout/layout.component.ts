import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from 'src/app/service/user-store.service';
import { AuthService } from 'src/app/service/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']

})
export class LayoutComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Output() menuState = new EventEmitter(); //new
  @Input() flag: boolean;
  @ViewChild('sidenav') sidenav: MatSidenav;
  public fullName: string = "";
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  sideBarFlag: boolean = false
  closesideBarFlag: boolean = true
  showFirst: boolean = true;
  showMenu = false;
  // currentUser: any;


  // menuType: String = 'default';
  constructor(private route: Router,
    private userStoreSrv: UserStoreService,
    private authSrv: AuthService,
    private ngtoast:NgToastService) { }


  ngOnInit(): void {
    debugger
    this.userStoreSrv.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.authSrv.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    })
  }

  isLoginError = new EventEmitter<boolean>(false)

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }
  toggleMenu() {
    this.showFirst = !this.showFirst
    console.log("inside toggleMenu");
    this.showMenu = !this.showMenu;
    this.menuState.emit(this.showMenu);
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  onSignOut() {
    localStorage.clear();
    // this.toastr.success('You have successfully signed out!', 'Success!');
    this.ngtoast.success({detail:'SUCCESS', summary:"You have successfully signed out!", duration:5000})
    this.route.navigate(['/login'])
    this.isLoginError.emit(false)

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
