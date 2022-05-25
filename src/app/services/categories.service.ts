import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';

import {Categoria} from '../models/Categtoria'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getChildren(){
    return this.http.get(`${environment.apiUrl}/categorias/child`)
  }

  getCategories(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${environment.apiUrl}/categorias`);
  }

  getDisCategorias() {
    return this.http.get(`${environment.apiUrl}/categorias/dis/`)
  }

  getCategory(id:number){
    return this.http.get(`${environment.apiUrl}/categorias/${id}`)
  }

  validCatname(categoria: string) {
    return this.http.get(`${environment.apiUrl}/categorias/catval/${categoria}`)
  }

  saveCat(categoria:Categoria){
    if(categoria.id){
      return this.http.put(`${environment.apiUrl}/categorias/${categoria.id}`,categoria)
    }else{
      return this.http.post(`${environment.apiUrl}/categorias/`, categoria)
    }
  }

  deleteCat(id:number){
    return this.http.delete(`${environment.apiUrl}/categorias/${id}`)
  }

  enableCat(id:number){
    return this.http.delete(`${environment.apiUrl}/categorias/dis/${id}`)
  }

  

}
