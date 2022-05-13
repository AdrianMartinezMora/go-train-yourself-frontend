import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdminProdFormComponent } from './components/admin/admin-prod-form/admin-prod-form.component';
import { AdminProdListComponent } from './components/admin/admin-prod-list/admin-prod-list.component';
import { ProdListComponent } from './components/prod-list/prod-list.component';

import {ProductsService} from './services/products.service';
import { RegisterComponent } from './components/notUser/register/register.component';
import { LoginComponent } from './components/notUser/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AdminProdFormComponent,
    AdminProdListComponent,
    ProdListComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
