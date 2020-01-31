import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards';

const routes: Routes = [{ path: 'login', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
