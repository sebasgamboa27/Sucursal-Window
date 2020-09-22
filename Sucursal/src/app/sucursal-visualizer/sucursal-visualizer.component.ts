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
}

deleteSucursal(){
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
  let state;
  if (this.habilitada){
    state = '1';
  }
  else{
    state = '0';
  }

  console.log(this.habilitada, state);

  if(this.user.PermissionId == 1){
    this.permissionState = 1;

    let counter = 2 
    let intervalId = setInterval(() => {
      counter -= 1;
      console.log(counter)
      if(counter === 0) this.resetAlert()
    }, 5000)

  }

  else{
    this.database.updateSucursal(this.sucursal.Email, state, data => {
      if (data != null){
        console.log('Sucursal actualizada');
      }
      else{
        console.log('Error al actualizar sucursal');
      }
    });
    this.permissionState = 2;
    let counter = 2 
    let intervalId = setInterval(() => {
      counter -= 1;
      console.log(counter)
      if(counter === 0) this.resetAlert()
    }, 5000)
    
  }

}

goBack(){
  this.router.navigateByUrl('/');
}

resetAlert(){
  this.permissionState = 0;
}

}


