import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent implements OnInit {

  @Input() username: string;
  @Input() password: string;

  loginState = false;

  constructor(private database: DatabaseService, private router: Router) { }

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

  checkLogin(){
    console.log(this.username, this.password);
    this.database.login(this.username, this.password, data => {
      if (data){
        console.log(data);
        this.router.navigateByUrl('/sucursal');
      }else {
        console.log('Cannot signin');
      }
    });
  }

}
