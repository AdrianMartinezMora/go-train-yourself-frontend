import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ProductsService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
