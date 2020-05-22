import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './component/login-form/login-form.component';


const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: '', redirectTo: '/login' , pathMatch: 'full' } // redirect vers /login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
