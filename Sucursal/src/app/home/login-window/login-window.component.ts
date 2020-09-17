import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent implements OnInit {

  constructor(private database: DatabaseService ) { }

  ngOnInit(): void {

  }

  focusIn(inputElement: HTMLInputElement){
    inputElement.classList.add('focus');
  }

  focusOut(inputElement: HTMLInputElement){
    if (inputElement.value === ''){
      inputElement.classList.remove('focus');
    }
  }

  async checkLogin(){
    console.log('Aqui va el checkeo del login, usando una funcion del servicio "database" ');
    const loginAccepted = await this.database.example();
  }

}
