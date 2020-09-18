import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SucursalVisualizerComponent } from './sucursal-visualizer/sucursal-visualizer.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sucursal', component: SucursalVisualizerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
