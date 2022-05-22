import { Component, OnInit } from '@angular/core';
import { DetallePedido } from 'src/app/models/DetallePedido';
import { Product } from 'src/app/models/Product';
import { CarritoService } from 'src/app/services/carrito.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private carritoSrv: CarritoService) { }

  carrito: Product[];
  carritoMostrar: Product[];
  detallePedido: DetallePedido[] = [];
  imageUrl: string = environment.imageUrl + '/productos/';
  precioTotal: number = 0;

  ngOnInit(): void {
    this.carrito = ([JSON.parse(localStorage.getItem('carrito'))])[0];
    this.calculateDetallePedido()
  }

  sacarProducto(id: number) {
    this.precioTotal = 0;
    for (let i = 0; i < this.carritoMostrar.length; i++) {
      if (id == this.carritoMostrar[i].id) {
        console.log("sacar");

        this.carritoSrv.sacarProducto(this.carritoMostrar[i])
      }

    }
    this.carrito = ([JSON.parse(localStorage.getItem('carrito'))])[0];
    this.calculateDetallePedido()

  }

  calculateDetallePedido() {
    
    this.detallePedido = []
    this.carritoMostrar = [];
    for (let i = 0; i < this.carrito.length; i++) {
      let nometer: boolean = false;
      let cant = 0;
      let precio = 0;
      let detProd: DetallePedido = {};

      for (let j = 0; j < this.carrito.length; j++) {
        if (this.carrito[i].id == this.carrito[j].id) {
          cant++
          precio += this.carrito[i].precio

          detProd = {
            id_producto: this.carrito[i].id,
            precio: precio,
            cantidad: cant
          }

        }
      }

      for (let h = 0; h < this.detallePedido.length; h++) {
        if (this.detallePedido[h].id_producto == detProd.id_producto) {
          nometer = true;
        }

      }
      if (!nometer) {
        this.detallePedido.push(detProd);
      }

    }

    for (let i = 0; i < this.detallePedido.length; i++) {
      this.precioTotal += this.detallePedido[i].precio
      let cont = 0;
      for (let j = 0; j < this.carrito.length; j++) {
        if (this.detallePedido[i].id_producto == this.carrito[j].id && cont == 0) {
          this.carritoMostrar.push(this.carrito[j])
          cont++
        }
      }
    }
    this.precioTotal = Math.round((this.precioTotal + Number.EPSILON) * 100) / 100;
  }

}
