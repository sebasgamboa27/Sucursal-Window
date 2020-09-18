import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent implements OnInit {

  @ViewChild('userInput') userInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;

  constructor(private database: DatabaseService) { }

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
    this.database.login(this.userInput.nativeElement.value, this.passwordInput.nativeElement.value);
  }

}
