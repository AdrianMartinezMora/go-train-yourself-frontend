import { Component, HostBinding, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2'

import { ProductsService } from '../../services/products.service'
@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css']
})
export class ProdListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  @Input() productos: any = []

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    
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
