import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';

import {Categoria} from '../models/Categtoria'
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getChildren(){
    return this.http.get(`${environment.apiUrl}/categorias/child`)
  }

  getCategories(){
    return this.http.get(`${environment.apiUrl}/productos/cat`)
  }

  getProduct(id:number){
    return this.http.get(`${environment.apiUrl}/productos/${id}`)
  }

  deleteProduct(id:number){
    return this.http.delete(`${environment.apiUrl}/productos/${id}`)
  }

  updateProduct(id:number, updatedProduct:Categoria) {
    return this.http.put(`${environment.apiUrl}/productos/${id}`,updatedProduct)
  }

  saveProduct(product:Categoria){
    return this.http.post(`${environment.apiUrl}/productos/`, product)
  }
}
