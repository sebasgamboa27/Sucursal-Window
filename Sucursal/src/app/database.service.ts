import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  login(user: string, password: string) {
    this.http.get('http://localhost:3000/login', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        user,
        password
      })
    }).subscribe( data => {
      console.log(data);
    });
  }



}
