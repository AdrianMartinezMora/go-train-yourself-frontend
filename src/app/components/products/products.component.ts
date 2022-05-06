import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { ProductsService } from '../../services/products.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productos: any = []
  test: any;

  constructor(
    private prodSrv: ProductsService
    ) { }

  ngOnInit(): void {
    this.prodSrv.getProducts().subscribe(
      res => {
        this.productos = res
      },
      err => console.error(err)
    );
  }

}
