import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(".txtb input").on("focus",function(){
      $(this).addClass("focus");
    });
    
    $(".txtb input").on("blur",function(){
      if($(this).val() == "")
      $(this).removeClass("focus");
    });
  }

  checkLogin(){
    console.log('checking login');
  }

}
