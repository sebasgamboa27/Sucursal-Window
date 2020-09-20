import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sucursal } from 'src/models/sucursal';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-sucursal-visualizer',
  templateUrl: './sucursal-visualizer.component.html',
  styleUrls: ['./sucursal-visualizer.component.css']
})
export class SucursalVisualizerComponent implements OnInit {

  sucursal: Sucursal;

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
        console.log(this.sucursal);
      }
      else{
        this.sucursal.Name = 'Error al cargar la sucursal';
      }
    });
}

deleteSucursal(){
  this.database.deleteSucursal(this.sucursal.Email,data => {
    if (data != null){
      console.log('Sucursal Borrada');
    }
    else{
      console.log('Error al borrar sucursal');
    }
  });
  
}

goBack(){
  this.router.navigateByUrl('/');
}

}


