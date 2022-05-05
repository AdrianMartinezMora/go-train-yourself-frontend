import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import {Product} from '../models/Product'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(`${this.API_URI}/productos/`)
  }

  getCategories(){
    return this.http.get(`${this.API_URI}/productos/cat`)
  }

  getProduct(id:number){
    return this.http.get(`${this.API_URI}/productos/${id}`)
  }

  deleteProduct(id:number){
    return this.http.delete(`${this.API_URI}/productos/${id}`)
  }

  updateProduct(id:number, updatedProduct:Product) {
    return this.http.put(`${this.API_URI}/productos/${id}`,updatedProduct)
  }

  saveProduct(product:Product){
    return this.http.post(`${this.API_URI}/productos/`, product)
  }
}
