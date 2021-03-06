import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Sucursal } from 'src/models/sucursal';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  userEmail: string;

  constructor(private http: HttpClient) { }

  login(user: string, password: string, callback: (data: any) => void) {
    this.http.get('http://localhost:3000/login', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        user,
        password
      })
    }).subscribe( data => {
      if (data){
        this.userEmail = user;
      }
      callback(data);
    });
  }

  getSucursal( callback: (data: Sucursal) => void) {
    this.http.get<Sucursal>('http://localhost:3000/sucursal', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        email: this.userEmail,
      })
    }).subscribe(callback);
  }

  updateSucursal(sucursalEmail: string, state: string, callback: (data: any) => void) {
    this.http.put<any>('http://localhost:3000/sucursal', null, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        email: sucursalEmail,
        state
      })
    }).subscribe(callback);
  }

  userInfo(callback: (data: any) => void) {
    console.log('este es el email', this.userEmail);
    this.http.get('http://localhost:3000/userInfo', {headers: new HttpHeaders({
      'Content-Type':  'application/json',
        email: this.userEmail,
      })
    }).subscribe(callback);
  }

  permissions(callback: (data: any) => void) {
    this.http.get<any>('http://localhost:3000/permissions', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        email: this.userEmail
      })
    }).subscribe(callback);
  }

  


}



