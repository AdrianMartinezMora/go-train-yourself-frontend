import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { ProductsService } from '../../../services/products.service'


@Component({
  selector: 'app-prod-list',
  templateUrl: './admin-plist.component.html',
  styleUrls: ['./admin-plist.component.css']
})
export class AdminPlistComponent implements OnInit {

  search: string = '';
  productos: Product[] = [];
  showProductos: Product[] = [];
  imageApiUrl: string = environment.imageApiUrl + 'productos/';

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let categoria = params['categoria'];
      if(categoria != undefined){
        this.prodService.getProductsbyCategoria(categoria).subscribe((productos: Product[]) => this.productos = productos);
      }else{
        this.prodService.getProducts().subscribe(
          (res: Product[]) => {
            this.productos = res;
            this.showProductos = this.productos;
          } 
        )
      }
      
    });
  }

  filter(){
    this.showProductos = this.productos.filter(p => {
      return p.nombreProd.toLowerCase().includes(this.search.toLowerCase());
    });
  }

  deleteProduct(idProduct: number) {

    Swal.fire({
      title: 'Eliminar Producto?',
      text: "Esta accion no podra ser revertida",
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
              'Deleted!',
              'El producto se ha eliminado con exito',
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

}
