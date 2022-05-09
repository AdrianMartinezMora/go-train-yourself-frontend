import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdListComponent} from './components/prod-list/prod-list.component';
import { ProdFormComponent} from './components/admin/prod-form/prod-form.component';
import { LoginComponent } from './components/notUser/login/login.component';
import { RegisterComponent } from './components/notUser/register/register.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/productos',
    pathMatch: 'full'
  },
  {
    path:'productos',
    component: ProdListComponent
  },
  {
    path:'productos/categorias/:categoria',
    component: ProdListComponent
  },
  {
    path:'productos/categorias/',
    component: ProdListComponent
  },
  {
    path:'productos/add',
    component: ProdFormComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
