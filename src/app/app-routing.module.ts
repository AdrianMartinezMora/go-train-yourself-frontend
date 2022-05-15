import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdListComponent} from './components/prod-list/prod-list.component';
import { AdminProdFormComponent} from './components/admin/admin-prod-form/admin-prod-form.component';
import { LoginComponent } from './components/notUser/login/login.component';
import { RegisterComponent } from './components/notUser/register/register.component';
import { AdminPlistComponent } from './components/admin/admin-plist/admin-plist.component';
import { AuthGuard } from './shared/guards/authentication.guard';
import { AdminGuard } from './shared/guards/admin.guard';

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
    path:'admin/plist',
    component: AdminPlistComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path:'admin/productos/add',
    component: AdminProdFormComponent,
    canActivate: [AuthGuard, AdminGuard]
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
