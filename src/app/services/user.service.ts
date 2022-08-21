import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = environment.BASE_URL;

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // add a new user
  public addUser(user: User): Observable<Object> {
    return this.http.post(`${this.BASE_URL}/user/`, user);
  }

  // generate the token
  public generateToken(loginData: any): Observable<Object> {
    return this.http.post(`${this.BASE_URL}/generate-token`, loginData);
  }

  // login user
  public loginUser(token: string): boolean {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn(): boolean {
    const tokenStr = localStorage.getItem('token');
    if (tokenStr === undefined || tokenStr === '' || tokenStr === null) {
      return false;
    }
    return true;
  }

  // logout user
  public logoutUser(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get the token
  public getToken() {
    return localStorage.getItem('token');
  }

  // set user detail
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // get user detail
  public getUser() {
    const userDetails = localStorage.getItem('user');
    if (userDetails !== null) {
      return JSON.parse(userDetails);
    }
    this.logoutUser();
    return null;
  }

  // get current user which is logged in
  public getCurrentUser() {
    return this.http.get(`${this.BASE_URL}/current-user`);
  }


  // get user role 
  public getUserRole() {
    const user = this.getUser();
    return user.authorities[0].authority;
  }
}
