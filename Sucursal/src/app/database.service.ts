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

  deleteSucursal( sucursalEmail: string, callback: (data: any) => void) {
    this.http.delete<any>('http://localhost:3000/sucursal', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        email: sucursalEmail,
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

}



