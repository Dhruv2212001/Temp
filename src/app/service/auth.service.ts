import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload: any;
  // private baseUrl:string = ""
  constructor(private http: HttpClient) {
    this.userPayload = this.decodeToken();
  }

  signUp(signUp: any, role: string): Observable<any> {
    // return this.http.post("https://192.168.29.150:5000/api/Authentication/Register?role="+ role, signUp)
    return this.http.post("http://localhost:5066/api/Employee?role=" + role, signUp)

  }
  login(login: any): Observable<any> {
    return this.http.post("http://localhost:5066/api/Authentication/Login", login)
  }

  otp(res: any): Observable<any> {
    debugger
    // const url = `https://localhost:5066/api/Authentication/Login-2Factor?code=${res.code}&username=${res.username}`;
    const url = `http://localhost:5066/api/Authentication/Login-2Factor?code=${res.code}&username=${res.username}`;

    // Make the POST request with the constructed URL
    return this.http.post(url, {});
  }

  changePassword(obj: any): Observable<any> {
    debugger
    return this.http.post("http://localhost:5066/api/Authentication/Change-Password", obj)
  }

  role(): Observable<any> {
    debugger
    return this.http.get("http://localhost:5066/api/Roles")
  }
  roleForUsers(): Observable<any> {
    debugger
    return this.http.get("http://localhost:5066/api/Roles/Users")
  }

  getToken() {
    debugger
    return localStorage.getItem('token')
  }

  getToken1(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    debugger
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  decodeToken() {
    debugger
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token);
  }

  getfullNameFromToken() {
    debugger
    if (this.userPayload) {
      return this.userPayload.name;
    }
  }
  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }
}
