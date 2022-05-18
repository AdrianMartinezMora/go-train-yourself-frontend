import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CatProd } from '../models/Cat-Prod';

@Injectable({
  providedIn: 'root'
})
export class CatProdService {

  constructor(private http: HttpClient) { }

  create(catprod:CatProd){
    return this.http.post(`${environment.apiUrl}/cat-prod/`, catprod)
  }
  
  delete(id:number){
    return this.http.delete(`${environment.apiUrl}/cat-prod/${id}`)
  }

}
