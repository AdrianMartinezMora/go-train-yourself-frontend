import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { ProductsService } from '../../../services/products.service'


@Component({
  selector: 'app-plist',
  templateUrl: './admin-plist.component.html',
  styleUrls: ['./admin-plist.component.css']
})
export class AdminPlistComponent implements OnInit {

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
        this.prodService.getProducts().subscribe(
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

  deleteProduct(idProduct: number) {

    Swal.fire({
      title: 'Eliminar Producto?',
      text: "Esta acción no podrá ser revertida",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        this.prodService.deleteProduct(idProduct).subscribe(
          (resp) => {
            let element = this.productos.filter((e: any) => e.id == idProduct)[0];
            this.productos.splice(this.productos.indexOf(element), 1)

            Swal.fire(
              'Eliminado!',
              'El producto se ha eliminado con éxito',
              'success'
            )

          },
          (err) => {

            Swal.fire(
              'Error',
              'No se ha podido eliminar',
              'error'
            )

          },
          () => { }
        )


      }
    })
  }


  editProduct(id: number) {
    this.router.navigate(['/admin/productos/add/'+id])
  }

}
