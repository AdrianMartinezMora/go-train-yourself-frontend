import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

import { ProductsService } from '../../services/products.service'
@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css']
})
export class ProdListComponent implements OnInit {

  search: string = '';
  productos: Product[] = [];
  showProductos: Product[] = [];
  imageUrl: string = environment.imageUrl + '/productos/';

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let categoria = params['categoria'];
      if(categoria != undefined){
        this.prodService.getProductsbyCategoria(categoria).subscribe((productos: Product[]) => {this.productos = productos,this.showProductos = productos});
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

}
