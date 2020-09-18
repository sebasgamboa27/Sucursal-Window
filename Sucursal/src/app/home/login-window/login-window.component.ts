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

  loginState: boolean = false;

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

  async checkLogin(){

    console.log(this.username,this.password);
    this.router.navigateByUrl('/sucursal');

    //this.loginState = await this.database.makeLogin(this.username,this.password);
    
    if(this.loginState){
      this.router.navigateByUrl('/sucursal');
    }
    else{
      console.log('error al conectarse');
    }

    // this.database.login(this.userInput.nativeElement.value, this.passwordInput.nativeElement.value, data => {
    // });
  }

}
