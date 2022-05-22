import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Product } from '../models/Product';
import { Carrito } from '../models/Carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public carrito$: BehaviorSubject<Carrito> = new BehaviorSubject<Carrito>({});
  private carrito = this.carrito$.value;
  constructor() {
    this.loadCarrito();
  }

  meterProducto(idProducto: number, cantidad: number){
    if(!this.carrito[idProducto])
      this.carrito[idProducto] = 0;
    this.carrito[idProducto] += cantidad;

    if(this.carrito[idProducto] <= 0)
      delete this.carrito[idProducto];

    this.carrito$.next(this.carrito);
    this.saveCarrito();
  }

  saveCarrito(){
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }

  loadCarrito(){
    let saved = JSON.parse(localStorage.getItem("carrito"));
    if(saved){
      this.carrito = saved;
      this.carrito$.next(this.carrito);
    }
  }


  // meterProducto(producto: Product) {
  //   var cart = JSON.parse(localStorage.getItem("carrito") || "[]");
  //   cart.push(producto);
  //   localStorage.setItem("carrito", JSON.stringify(cart));
  // }

  // sacarProducto(producto:Product){
  //   var cart = JSON.parse(localStorage.getItem("carrito") || "[]");
  
  //   for (let i = 0; i < cart.length; i++) {
  //     if(cart[i].id == producto.id){
  //       cart.splice(cart.indexOf(cart[i]), 1)
  //       i=cart.length+1
  //     }
  //   }
  //   localStorage.setItem("carrito", JSON.stringify(cart));
  // }
}
