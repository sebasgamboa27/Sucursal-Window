import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sucursal-visualizer',
  templateUrl: './sucursal-visualizer.component.html',
  styleUrls: ['./sucursal-visualizer.component.css']
})
export class SucursalVisualizerComponent implements OnInit {

  sucursalName: string;
  sucursalMoney: number;

  constructor() {
    this.sucursalName = 'Nombre de la sucursal';
    this.sucursalMoney = 4657;
  }

  ngOnInit(): void {
  }

}
