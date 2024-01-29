import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawerMode, MatSidenav} from '@angular/material/sidenav';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HRMS';
  @ViewChild('sidenav') sidenav: MatSidenav;

  items: any;
  showSideBar: any;
  toggleFlag: boolean;
  subMenuState:boolean = false;
  menuType: String = "default";

  constructor(private authService: AuthService, private route:Router) { }

  addItem(event) {
    if (event == false) {
      this.triggerFalseClick(this.sidenav.open())
    }
    if (event == true) {
      this.triggerFalseClick(this.sidenav.close())
    }
    // this.items.push();
  }

  @ViewChild('clickTrigger') clickTrigger: ElementRef<HTMLElement>;

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
  }

  triggerFalseClick(toggle) {
    this.clickTrigger.nativeElement.onclick(toggle)
  }

  // ngOnInit(){
  //   this.sidenav.open()
  // }
  burgerClicked(evnt){
    this.subMenuState = evnt;
    console.log("inside burgerClicked: pls. change showMenu to be:",this.subMenuState);
  }
  // isLoggedIn(): boolean {
  //   return this.authService.isLoggedIn();
  // }
 

}
