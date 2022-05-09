import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';

import { ProductsService } from '../../../services/products.service'
@Component({
  selector: 'app-prod-form',
  templateUrl: './prod-form.component.html',
  styleUrls: ['./prod-form.component.css']
})
export class ProdFormComponent implements OnInit {
  
  producto: Product = {
    
  }

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
  
  }

  saveNewProduct(){
    this.prodService.saveProduct(this.producto).subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err)
    )
  }

}
