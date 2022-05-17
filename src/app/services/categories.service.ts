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

  validCatname(categoria: string) {
    return this.http.get(`${environment.apiUrl}/categorias/catval/${categoria}`)
  }

  saveCat(categoria:Categoria){
    return this.http.post(`${environment.apiUrl}/categorias/`, categoria)
  }

  deleteCat(id:number){
    return this.http.delete(`${environment.apiUrl}/categorias/${id}`)
  }

  

}
