import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdListComponent} from './components/prod-list/prod-list.component';
import { AdminProdFormComponent} from './components/admin/admin-prod-form/admin-prod-form.component';
import { LoginComponent } from './components/notUser/login/login.component';
import { RegisterComponent } from './components/notUser/register/register.component';
import { AdminPlistComponent } from './components/admin/admin-plist/admin-plist.component';
import { AdminCatListComponent } from './components/admin/admin-cat-list/admin-cat-list.component';
import { AdminUserListComponent } from './components/admin/admin-user-list/admin-user-list.component';
import { AdminOrderListComponent } from './components/admin/admin-order-list/admin-order-list.component';
import { AdminCatFormComponent } from './components/admin/admin-cat-form/admin-cat-form.component';
import { CarritoComponent } from './components/carrito/carrito.component';

import { AuthGuard } from './shared/guards/authentication.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { CatListComponent } from './components/cat-list/cat-list.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/categorias',
    pathMatch: 'full'
  },
  {
    path:'productos',
    component: ProdListComponent
  },
  {
    path:'categorias',
    component: CatListComponent
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
    path:'productos/detalle',
    component: ProductoDetalleComponent
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
    path:'admin/productos/add/:id',
    component: AdminProdFormComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path:'admin/categorias/add/:id',
    component: AdminCatFormComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path:'register/:id',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'admin/catlist',
    component: AdminCatListComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path:'admin/categorias/add',
    component: AdminCatFormComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path:'admin/userlist',
    component: AdminUserListComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path:'admin/orderlist',
    component: AdminOrderListComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path:'carrito',
    component: CarritoComponent
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
