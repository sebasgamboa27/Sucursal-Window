import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Sucursal } from 'src/interfaces/sucursal';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  login(user: string, password: string, callback: (data: any) => void) {
    this.http.get('http://localhost:3000/login', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        user,
        password
      })
    }).subscribe(callback);
  }

  getSucursal( callback: (data: Sucursal[]) => void) {
    this.http.get('http://localhost:3000/sucursal', {}).subscribe(callback);
  }
}
