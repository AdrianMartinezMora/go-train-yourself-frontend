import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/Carrito';
import { DetallePedido } from 'src/app/models/DetallePedido';
import { Pedido } from 'src/app/models/Pedido';
import { Product } from 'src/app/models/Product';
import { AccountService } from 'src/app/services/account.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  pedido: Pedido = { detalle: [], locEntrega: "" };
  productos: { [id: number]: Product } = {};
  imageUrl: string = environment.imageUrl + '/productos/';
  precioTotal: number = 0;
  form: FormGroup;
  error: boolean = false;

  constructor(
    private carritoSrv: CarritoService,
    private accountSrv: AccountService,
    private productosSrv: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      location: ['']
    })

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

  eliminar(idProd: number) {
    this.carritoSrv.eliminarProducto(idProd);
  }

  anadir(idProd: number) {
    this.carritoSrv.meterProducto(idProd, 1);
  }

  restar(idProd: number) {
    this.carritoSrv.meterProducto(idProd, -1);
  }

  loadPedido(carrito: Carrito) {
    this.precioTotal = 0;
    let detalles: DetallePedido[] = [];
    for (let idProd in carrito) {
      this.precioTotal += carrito[idProd] * this.productos[idProd].precio;

      let detalle: DetallePedido = {
        idProducto: +idProd,
        cantidad: carrito[idProd]
      };
      detalles.push(detalle);
    }
    this.precioTotal = Math.round((this.precioTotal + Number.EPSILON) * 100) / 100
    this.pedido.detalle = detalles;
  }

  sacarProducto(id: number) {
    this.carritoSrv.meterProducto(id, -1);
  }

  onSubmit(f: any) {
    this.pedido.locEntrega = this.form.value.location
    this.pedido.precioTotal = this.precioTotal

    if (localStorage.getItem("carrito") == null) {
      this.error = true;
    } else {
      this.carritoSrv.create(this.pedido).subscribe(res => {

        this.carritoSrv.limpiarcarrito();

        Swal.fire({
          title: 'Pedido realizado con éxito.',
          text: "¿Ahora que quieres hacer?",
          showDenyButton: true,
          confirmButtonText: 'Ir al home',
          denyButtonText: `Ir a pedidos`,
        }).then((result) => {

          if (result.isConfirmed) {
            this.router.navigate(['/']);
          } else if (result.isDenied) {
            this.router.navigate(['/orderList/' + this.pedido.idUsuario]);
          }
        })


      }, err => console.log(err))
    }





  }
}
