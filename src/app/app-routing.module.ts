import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdListComponent} from './components/prod-list/prod-list.component';
import { AdminProdFormComponent} from './components/admin/admin-prod-form/admin-prod-form.component';
import { AdminProdListComponent } from './components/admin/admin-prod-list/admin-prod-list.component';
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
    path:'admin/productos/add',
    component: AdminProdFormComponent
  },
  {
    path:'admin/productos/',
    component: AdminProdListComponent
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
