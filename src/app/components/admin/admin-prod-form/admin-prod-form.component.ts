import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { PhotoService } from 'src/app/services/photo.service';

import { v4 as uuid } from 'uuid';

import { ProductsService } from '../../../services/products.service'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-prod-form',
  templateUrl: './admin-prod-form.component.html',
  styleUrls: ['./admin-prod-form.component.css']
})
export class AdminProdFormComponent implements OnInit {

  producto: Product = {

  }

  fileError: boolean = false;
  file: File | undefined;
  photoSelected: string | ArrayBuffer | null | undefined;

  constructor(private prodSrv: ProductsService, private photoSrv: PhotoService) { }

  ngOnInit(): void {

  }

  onPhotoSelected(event: HtmlInputEvent | any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0]
      //image preview
      const reader = new FileReader;
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file)
    }
  }

  saveNewProduct(f: NgForm) {

    if (this.file) {
      let arr = this.file.name.split(".");
      let ext = arr.pop()
      const myNewFile = new File([this.file], uuid() + '.' + ext)

      this.producto = {
        nombreProd: f.value.prodName,
        precio: f.value.precio,
        stock: f.value.stock,
        foto: myNewFile.name,
      }
      console.log(this.producto);
      
      
          this.prodSrv.saveProduct(this.producto).subscribe(
            res => {
              console.log(res)
              this.photoSrv.createProdPhoto(myNewFile).subscribe(res => console.log(res),err => console.log(err)
           )
            },
            err => console.log(err)
          )
      
           
      

    } else {
      this.fileError = true
    }



    /*
    
    */
  }

}
