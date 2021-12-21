import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token = '';
  users;

  constructor(private http: HttpClient) { }

  login(credentials: {login; password}): Observable<any> {
    return this.http.post(`http://studentapi.myknitu.ru/auth/`, credentials).pipe(
      map((data: any) => data.token));
  }

  register(credentials: {login; password}): Observable<any> {
    return this.http.post(`http://studentapi.myknitu.ru/register/`, credentials).pipe(
      map((data: any) => data.token));
  }
  getUser(credentials: {token}): Observable<any> {
    return this.http.post(`http://studentapi.myknitu.ru/getuser/`, credentials).pipe(
      map((data: any) =>
        [data.id_user, data.img, data.family, data.vk, data.birthday, data.phonenumber, data.user, data.skype, data.login]));
  }
  loadList(credentials: {token}): Observable<any> {
    return this.http.post(`http://studentapi.myknitu.ru/listusers/`, credentials).pipe(
      map((data: any) => data.users));
  }
  loadDialog(credentials: {token; userto}): Observable<any> {
    return this.http.post('http://studentapi.myknitu.ru/getdialog/', credentials).pipe(
      map((data: any) => data.messages));
  }
  sendMessage(credentials: {token; userto; message}): Observable<any> {
    return this.http.post('http://studentapi.myknitu.ru/sendmessage/', credentials).pipe(
      map((data: any) => data.status));
  }
}
