import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AccountService } from 'src/app/services/account.service';
import { CarritoService } from 'src/app/services/carrito.service';


@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  id: number;

  imageUrl: string = environment.imageUrl + '/productos/';

  url:string;
  producto: Product;

  constructor(
    private productSrv: ProductsService, 
    private route: ActivatedRoute, 
    private acSrv: AccountService, 
    private router: Router,
    private cartSrv: CarritoService) {}

  ngOnInit(): void {
    this.url=window.location.href;
     
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

  addCarrito(prod:Product) {

    if (this.acSrv.usuarioValue) {
      this.cartSrv.meterProducto(prod.id, 1);
      //this.cartSrv.meterProducto(prod)
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

  onClick(){
    console.log("yepa");
    
    if(this.url!= window.location.href){
      window.location.reload()
    }
  }


}
