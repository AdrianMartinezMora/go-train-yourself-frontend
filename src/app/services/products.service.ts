import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import {Product} from '../models/Product'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(`${environment.apiUrl}/productos/`)
  }

  getDisProducts(){
    return this.http.get(`${environment.apiUrl}/productos/dis/`)
  }
  
  getProductsbyCategoria(idCat: number){
    return this.http.get(`${environment.apiUrl}/productos/catMenu/${idCat}`)
  }

  getProduct(id:number){
    return this.http.get(`${environment.apiUrl}/productos/${id}`)
  }

  deleteProduct(id:number){
    return this.http.delete(`${environment.apiUrl}/productos/${id}`)
  }

  enableProduct(id:number){
    return this.http.delete(`${environment.apiUrl}/productos/dis/${id}`)
  }

  updateProduct(id:number, updatedProduct:Product) {
    return this.http.put(`${environment.apiUrl}/productos/${id}`,updatedProduct)
  }

  saveProduct(product:Product){
    if(product.id){
      return this.http.put(`${environment.apiUrl}/productos/${product.id}`,product)
    }else{
      return this.http.post(`${environment.apiUrl}/productos/`, product)
    }

  }

}
