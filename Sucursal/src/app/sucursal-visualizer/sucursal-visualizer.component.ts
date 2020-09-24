import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sucursal } from 'src/models/sucursal';
import { User } from 'src/models/user';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-sucursal-visualizer',
  templateUrl: './sucursal-visualizer.component.html',
  styleUrls: ['./sucursal-visualizer.component.css']
})
export class SucursalVisualizerComponent implements OnInit {

  sucursal: Sucursal;
  @Input() habilitada: boolean;
  user: User;
  permissionState: number = 0;
  userPermissions: any[];
  saldo: boolean = false;
  update: boolean = false;
  transacciones: boolean = false;
  delete: boolean = false;
  deletedAlert: boolean = false;

  constructor(private database: DatabaseService, private router: Router) {
    this.sucursal = {
      Name: 'Loading...',
      Email: 'Loading...',
      Phone: 'Loading...',
      Enabled: false,
      capital: 0,
      AddresId: null,
    };
  }

  ngOnInit(): void {
    this.database.getSucursal( data => {
      if (data){
        this.sucursal = data;
      }
      else{
        this.sucursal.Name = 'Error al cargar la sucursal';
      }
    });

    this.database.userInfo(data => {
      if (data){
        debugger;
        this.user = data[0];
        console.log(this.user);
      }
      else{
        console.log('Error al cargar usuario');
      }
    });

    this.database.permissions(data => {
      if (data){
        debugger;
        this.userPermissions = data;
        for (let i = 0; i < this.userPermissions.length; i++) {
          if(this.userPermissions[i].Code == 1){
            this.update = true;
          }
          else if(this.userPermissions[i].Code == 2){
            this.saldo = true;
          }
          else if(this.userPermissions[i].Code == 3){
            this.transacciones = true;
          }
          else if(this.userPermissions[i].Code == 4){
            this.delete = true;
          }
          
        }
      }
      else{
        console.log('Error al cargar permisos');
      }
    });



}

deleteSucursal(){
  if(!this.delete){
    this.deletedAlert = true;
    let counter = 2 
    let intervalId = setInterval(() => {
      counter -= 1;
      console.log(counter)
      if(counter === 0) this.deletedAlert=false
    }, 5000)
    return;
  }
  this.database.updateSucursal(this.sucursal.Email, '0', data => {
    if (data != null){
      console.log('Sucursal Borrada');
    }
    else{
      console.log('Error al borrar sucursal');
    }
  });

}

updateSucursal(){

  if(!this.update){
    this.habilitada = !this.habilitada;
    this.permissionState = 2;
    let counter = 2 
    let intervalId = setInterval(() => {
      counter -= 1;
      console.log(counter)
      if(counter === 0) this.resetAlert()
    }, 5000)
    return;
  }

  let state;
  if (this.habilitada){
    state = '1';
  }
  else{
    state = '0';
  }

  console.log(this.habilitada, state);

  this.permissionState = 1;

  let counter = 2 
  let intervalId = setInterval(() => {
    counter -= 1;
    console.log(counter)
    if(counter === 0) this.resetAlert()
  }, 5000)

  
  this.database.updateSucursal(this.sucursal.Email, state, data => {
    if (data != null){
      console.log('Sucursal actualizada');
    }
    else{
      console.log('Error al actualizar sucursal');
    }
  });
  

}

goBack(){
  this.router.navigateByUrl('/');
}

resetAlert(){
  this.permissionState = 0;
}

}


