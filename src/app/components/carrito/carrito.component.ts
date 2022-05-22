import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/models/Carrito';
import { DetallePedido } from 'src/app/models/DetallePedido';
import { Pedido } from 'src/app/models/Pedido';
import { Product } from 'src/app/models/Product';
import { AccountService } from 'src/app/services/account.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  pedido: Pedido = {detalle: [], locEntrega: ""};
  productos: {[id: number]: Product} = {};
  imageUrl: string = environment.imageUrl + '/productos/';
  precioTotal: number = 0;

  constructor(
    private carritoSrv: CarritoService,
    private accountSrv: AccountService,
    private productosSrv: ProductsService
    ) { }

  ngOnInit(): void {
    //Primero se cargan los productos porque son necesarios para el calculo inicial y final
    this.productosSrv.getProducts().subscribe((productos: Product[]) => {
      this.productos = {};
      productos.forEach(prod => {
        this.productos[prod.id] = prod;
      });

      
      // Una vez cargados los productos nos subscribimos y cargamos el pedido
      this.loadPedido(this.carritoSrv.carrito$.value);
      this.carritoSrv.carrito$.subscribe((carrito: Carrito) => {
        this.loadPedido(carrito);
      });
    });

    this.pedido.idUsuario = this.accountSrv.usuarioValue.id;
  }

  anadir(idProd: number){
    this.carritoSrv.meterProducto(idProd, 1);
  }

  restar(idProd: number){
    this.carritoSrv.meterProducto(idProd, -1);
  }

  loadPedido(carrito: Carrito){
    this.precioTotal = 0;
    let detalles:DetallePedido[] = [];
      for(let idProd in carrito){
        this.precioTotal += carrito[idProd] * this.productos[idProd].precio;
        
        let detalle: DetallePedido = {
          idProducto: +idProd,
          cantidad: carrito[idProd]
        };
        detalles.push(detalle);
      }
      this.pedido.detalle = detalles;
  }

  sacarProducto(id: number) {
    this.carritoSrv.meterProducto(id, -1);
  }
}
