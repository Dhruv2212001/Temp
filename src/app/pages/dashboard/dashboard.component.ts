import { Component } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { EmployeeService } from 'src/app/service/employee.service';
import { LeaveComponent } from '../leave/leave.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGrigPlugin, interactionPlugin]
  }

  LeaveArray: any;
  calendarEventsArray:object;

  calendarEvents = [];
  
  
  constructor(private empSrv:EmployeeService, private http:HttpClient){
    
  
  }

  ngOnInit(){
    setTimeout(() => {
      return this.empSrv.getAllLeave().subscribe((res:any)=>{
        if(res){
          res.forEach(element => {
            var obj = {
              title : element.empname,
              start :element.startDate,
              end   : element.endDate,
              description: element.leaveReason,
              color : '#019efb',
            }
            console.log(obj)
            this.calendarEvents.push(obj); 
          });
        }
            
        });
    }, 1200);

    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: this.calendarEvents
      };
    }, 3500);
  }

}
