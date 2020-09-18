import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginWindowComponent } from './home/login-window/login-window.component';
import { HttpClientModule } from '@angular/common/http';
import { SucursalVisualizerComponent } from './sucursal-visualizer/sucursal-visualizer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginWindowComponent,
    SucursalVisualizerComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
