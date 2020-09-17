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
    $(".txtb input").on("focus",function(){
      $(this).addClass("focus");
    });
    
    $(".txtb input").on("blur",function(){
      if($(this).val() == "")
      $(this).removeClass("focus");
    });
  }

  async checkLogin(){
    console.log('Aqui va el checkeo del login, usando una funcion del servicio "database" ');
    const loginAccepted = await this.database.example();
  }

}
