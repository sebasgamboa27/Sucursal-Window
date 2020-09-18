import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  

  /*login(user: string, password: string, callback: (data: any) => void) {
    this.http.get('http://localhost:3000/login', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        user,
        password
      })
    }).subscribe(callback);
  }*/

  async makeLogin(user: string,password:string) {
    return await this.http.post<any>('http://localhost:3000/makeLogin',{user:user,password:password}).toPromise();
  }

}
