import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProdFormComponent } from './components/prod-form/prod-form.component';
import { ProdListComponent } from './components/prod-list/prod-list.component';

import {ProductsService} from './services/products.service';
import { NavigationAdminComponent } from './components/navigation-admin/navigation-admin.component';
import { NavigationRegistredComponent } from './components/navigation-registred/navigation-registred.component'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProdFormComponent,
    ProdListComponent,
    NavigationAdminComponent,
    NavigationRegistredComponent
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
