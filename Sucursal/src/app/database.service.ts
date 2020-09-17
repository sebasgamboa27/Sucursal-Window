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


  // Funciones de la aplicacion, que se comunican con el servidor, para hacer las funciones del index.js

  async example() {
    return await this.http.post<any>('http://localhost:3000/queryExample',{}).toPromise();
  }



}
