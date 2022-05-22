import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public carrito$: Product[];

  constructor() {
    this.carrito$ = JSON.parse(localStorage.getItem("carrito") || "[]");
  }

  meterProducto(producto: Product) {
    var cart = JSON.parse(localStorage.getItem("carrito") || "[]");
    cart.push(producto);
    localStorage.setItem("carrito", JSON.stringify(cart));
  }

  sacarProducto(producto:Product){
    var cart = JSON.parse(localStorage.getItem("carrito") || "[]");
  
    for (let i = 0; i < cart.length; i++) {
      if(cart[i].id == producto.id){
        cart.splice(cart.indexOf(cart[i]), 1)
        i=cart.length+1
      }
    }
    localStorage.setItem("carrito", JSON.stringify(cart));
  }
}
