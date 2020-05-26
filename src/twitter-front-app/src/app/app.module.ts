import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';
import { NavComponent } from './component/nav/nav.component';
import { SignupFormComponent } from './component/signup-form/signup-form.component';
import { BarChartComponent } from './template/bar-chart/bar-chart.component';
import { ChartistModule } from 'ng-chartist';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    NavComponent,
    SignupFormComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
