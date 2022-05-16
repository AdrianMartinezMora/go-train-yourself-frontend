import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { Categoria } from 'src/app/models/Categtoria';
import { CatProd } from 'src/app/models/Cat-Prod';
import { v4 as uuid } from 'uuid';

import { ProductsService } from '../../../services/products.service'
import { CategoriesService } from 'src/app/services/categories.service';
import { PhotoService } from 'src/app/services/photo.service';
import { CatProdService } from 'src/app/services/cat-prod.service';
import { Router } from '@angular/router';


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

  newProdId: any = {
    affectedRows: null,
    fieldCount: null,
    info: null,
    insertId: null,
    serverStatus: null,
    warningStatus: null
  }

  categoriasSelected: number[] = []

  categorias: Categoria[] = []

  fileError: boolean = false;
  file: File | undefined;
  photoSelected: string | ArrayBuffer | null | undefined;
  catError = false;

  constructor(
    private prodSrv: ProductsService, 
    private photoSrv: PhotoService, 
    private catSrv: CategoriesService, 
    private catProdSrv: CatProdService,
    private router: Router) { }

  ngOnInit(): void {
    this.catSrv.getCategories().subscribe(
      (res: Categoria[]) => {
        this.categorias = res
      }
    )

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

  onchangeCheckbox(event: { id: number, event: any }) {

    let seleccionado = event.event.target.checked

    if (seleccionado) {
      this.categoriasSelected.push(event.id)
    } else {
      let index = this.categoriasSelected.indexOf(event.id)
      this.categoriasSelected.splice(index, 1)

    }

    if (this.categoriasSelected.length < 1) {
      this.catError = true
    } else {
      this.catError = false
    }
  }

  saveNewProduct(f: NgForm) {

    if (this.categoriasSelected.length > 0) {
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

        this.prodSrv.saveProduct(this.producto).subscribe(
          res => {
            this.newProdId=res
            this.photoSrv.createProdPhoto(myNewFile).subscribe(res => console.log(res), err => console.log(err))
            
            for (let i = 0; i < this.categoriasSelected.length; i++) {
              let catprod:CatProd={
                id_prod:this.newProdId.insertId,
                id_cat:this.categoriasSelected[i]
              }
              this.catProdSrv.create(catprod).subscribe(res => console.log(res), err => console.log(err))
            }
          },
          err => console.log(err)
        )

        this.router.navigate(['/admin/plist']);
      } else {
        this.fileError = true
      }
    } else {
      this.catError = true;
    }

  }

}
