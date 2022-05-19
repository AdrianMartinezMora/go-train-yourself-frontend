import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  id: number;

  imageUrl: string = environment.imageUrl + '/productos/';

  producto: Product;

  constructor(private productSrv: ProductsService, private route: ActivatedRoute, private acSrv: AccountService, private router: Router) { }

  ngOnInit(): void {
    //Comprobar si hay una categoria para modificar
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = +this.route.snapshot.paramMap.get('id')
      this.productSrv.getProduct(this.id).subscribe(
        (res: Product) => {
          this.producto = res[0]
        }
      )
    }
  }

  addCarrito() {

    if (this.acSrv.usuarioValue) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El producto se a añadido al carrito',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      this.router.navigate(['login'])
    }
  }



}
