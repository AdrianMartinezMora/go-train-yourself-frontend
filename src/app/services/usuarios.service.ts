import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Usuario from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get(`${environment.apiUrl}/usuarios/`)
  }

  getDisUsuarios() {
    return this.http.get(`${environment.apiUrl}/usuarios/dis/`)
  }

  getUsuario(id: number) {
    return this.http.get(`${environment.apiUrl}/usuarios/${id}`)
  }

  validUsername(nombre: string) {
    return this.http.get(`${environment.apiUrl}/usuarios/userVal/${nombre}`)
  }

  validEmail(email: string) {
    return this.http.get(`${environment.apiUrl}/usuarios/emailVal/${email}`)
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${environment.apiUrl}/usuarios/${id}`)
  }
  
  enableUsuario(id: number) {
    return this.http.delete(`${environment.apiUrl}/usuarios/dis/${id}`)
  }

  updateUsuario(id: number, updatedUsuario: Usuario) {
    return this.http.put(`${environment.apiUrl}/usuarios/${id}`, updatedUsuario)
  }

  register(usuario: Usuario) {
    if(usuario.id){
      return this.http.put(`${environment.apiUrl}/usuarios/${usuario.id}`, usuario)
    }else{
      return this.http.post(`${environment.apiUrl}/usuarios/`, usuario)
    }
    
  }

}
