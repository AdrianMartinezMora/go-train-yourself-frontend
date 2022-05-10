import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getUsuario(id: number) {
    return this.http.get(`${environment.apiUrl}/usuarios/${id}`)
  }

  registerOk(nombre: string) {
    return this.http.get(`${environment.apiUrl}/usuarios/regOk/${nombre}`)
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${environment.apiUrl}/usuarios/${id}`)
  }

  updateUsuario(id: number, updatedUsuario: Usuario) {
    return this.http.put(`${environment.apiUrl}/usuarios/${id}`, updatedUsuario)
  }

  register(usuario: Usuario) {
    return this.http.post(`${environment.apiUrl}/usuarios/`, usuario)
  }

  login(username: string, password: string){
    return this.http.post(`${environment.apiUrl}/usuarios/login?username=${username}&password=${password}`, {});
  }

}
