import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'src/interfaces/sucursal';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-sucursal-visualizer',
  templateUrl: './sucursal-visualizer.component.html',
  styleUrls: ['./sucursal-visualizer.component.css']
})
export class SucursalVisualizerComponent implements OnInit {

  sucursalMoney: number = 4367.50;

  sucursales: Sucursal[];

  constructor(private database: DatabaseService) {

  }

  ngOnInit(): void {
    this.database.getSucursal( data => {
      console.log(data);
      if(data != null){
        this.sucursales = data;
        console.log(this.sucursales);
      }
      else{
        console.log('error cargando sucursales');
      }
    });
}

}


