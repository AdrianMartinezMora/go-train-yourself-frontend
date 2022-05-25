import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdminProdFormComponent } from './components/admin/admin-prod-form/admin-prod-form.component';
import { ProdListComponent } from './components/prod-list/prod-list.component';

import {ProductsService} from './services/products.service';
import { RegisterComponent } from './components/notUser/register/register.component';
import { LoginComponent } from './components/notUser/login/login.component';
import { AdminPlistComponent } from './components/admin/admin-plist/admin-plist.component';
import { JwtInterceptor } from './shared/guards/jwt.interceptor';
import { AdminCatListComponent } from './components/admin/admin-cat-list/admin-cat-list.component';
import { AdminUserListComponent } from './components/admin/admin-user-list/admin-user-list.component';
import { AdminOrderListComponent } from './components/admin/admin-order-list/admin-order-list.component';
import { AdminCatFormComponent } from './components/admin/admin-cat-form/admin-cat-form.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { UsuarioDetalleComponent } from './components/usuario-detalle/usuario-detalle.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { CatListComponent } from './components/cat-list/cat-list.component';
import { PedidosListComponent } from './components/pedidos-list/pedidos-list.component';
import { PedidoDetalleComponent } from './components/pedido-detalle/pedido-detalle.component';
import { FooterComponent } from './components/footer/footer.component';
import { PPrivacyComponent } from './components/p-privacy/p-privacy.component';
import { ProdDisComponent } from './components/admin/prod-dis/prod-dis.component';
import { CatDisComponent } from './components/admin/cat-dis/cat-dis.component';
import { UserDisComponent } from './components/admin/user-dis/user-dis.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AdminProdFormComponent,
    ProdListComponent,
    RegisterComponent,
    LoginComponent,
    AdminPlistComponent,
    AdminCatListComponent,
    AdminUserListComponent,
    AdminOrderListComponent,
    AdminCatFormComponent,
    CarritoComponent,
    UsuarioDetalleComponent,
    ProductoDetalleComponent,
    CatListComponent,
    PedidosListComponent,
    PedidoDetalleComponent,
    FooterComponent,
    PPrivacyComponent,
    ProdDisComponent,
    CatDisComponent,
    UserDisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProductsService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
