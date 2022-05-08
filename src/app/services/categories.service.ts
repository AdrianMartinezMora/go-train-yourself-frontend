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
}
