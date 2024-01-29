import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './pages/employee/employee.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { LeaveComponent } from './pages/leave/leave.component';
import { SalaryComponent } from './pages/salary/salary.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from'@angular/common/http'
import { FullCalendarModule } from '@fullcalendar/angular';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Leave1Component } from './pages/leave1/leave1.component';
import { MaterialModule } from './material.modules';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AuthService } from './service/auth.service';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { OtpComponent } from './pages/otp/otp.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { NumberDirective } from './numbers-only.directive';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { NgToastModule } from 'ng-angular-popup';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LayoutComponent,
        DashboardComponent,
        EmployeeComponent,
        AttendanceComponent,
        LeaveComponent,
        SalaryComponent,
        HomeComponent,
        SignupComponent,
        Leave1Component,
        SidebarComponent,
        FooterComponent,
        OtpComponent,
        ForgotpasswordComponent,
        ResetpasswordComponent,
        NumberDirective,
        ChangepasswordComponent
        
    ],
    providers: [{provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi: true}],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FullCalendarModule,
        BrowserAnimationsModule,
        MaterialModule, // register FullCalendar with your app
        BrowserAnimationsModule, 
        NgToastModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            // positionClass: 'toast-top-center',
            preventDuplicates: true,}),
    ]
})
export class AppModule { }
