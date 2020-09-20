import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'src/models/sucursal';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-sucursal-visualizer',
  templateUrl: './sucursal-visualizer.component.html',
  styleUrls: ['./sucursal-visualizer.component.css']
})
export class SucursalVisualizerComponent implements OnInit {

  sucursal: Sucursal;

  constructor(private database: DatabaseService) {
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

}


