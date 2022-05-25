import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { ProductsService } from '../../../services/products.service'

@Component({
  selector: 'app-prod-dis',
  templateUrl: './prod-dis.component.html',
  styleUrls: ['./prod-dis.component.css']
})
export class ProdDisComponent implements OnInit {

  search: string = '';
  productos: Product[] = [];
  showProductos: Product[] = [];
  imageUrl: string = environment.imageUrl + '/productos/';

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let categoria = params['categoria'];
      if (categoria != undefined) {
        this.prodService.getProductsbyCategoria(categoria).subscribe((productos: Product[]) => this.productos = productos);
      } else {
        this.prodService.getDisProducts().subscribe(
          (res: Product[]) => {
            this.productos = res;
            this.showProductos = this.productos;
          }
        )
      }

    });
  }

  filter() {
    this.showProductos = this.productos.filter(p => {
      return p.nombreProd.toLowerCase().includes(this.search.toLowerCase());
    });
  }

  enableProduct(idProduct: number) {

    Swal.fire({
      title: '¿Restaurar Producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {

        this.prodService.enableProduct(idProduct).subscribe(
          (resp) => {
            let element = this.showProductos.filter((e: any) => e.id == idProduct)[0];
            this.showProductos.splice(this.showProductos.indexOf(element), 1)

            Swal.fire(
              '¡Restaurado!',
              'El producto se ha restaurado con éxito',
              'success'
            )

          },
          (err) => {

            Swal.fire(
              'Error',
              'No se ha podido restaurar',
              'error'
            )

          },
          () => { }
        )


      }
    })
  }

}
