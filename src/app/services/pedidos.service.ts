import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  getPedidos() {
    return this.http.get(`${environment.apiUrl}/pedidos/`)
  }

  getUsuarioPedidos(idUs: number) {
    return this.http.get(`${environment.apiUrl}/pedidos/${idUs}`)
  }

  getDetallePedido(idPed: number) {
    return this.http.get(`${environment.apiUrl}/pedidos/orderDet/${idPed}`)
  }
}
