import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { Categoria } from 'src/app/models/Categtoria';
import { CatProd } from 'src/app/models/Cat-Prod';
import { v4 as uuid } from 'uuid';

import { ProductsService } from '../../../services/products.service'
import { CategoriesService } from 'src/app/services/categories.service';
import { PhotoService } from 'src/app/services/photo.service';
import { CatProdService } from 'src/app/services/cat-prod.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-prod-form',
  templateUrl: './admin-prod-form.component.html',
  styleUrls: ['./admin-prod-form.component.css']
})
export class AdminProdFormComponent implements OnInit {

  form:FormGroup;
  imageUrl: string = environment.imageUrl + '/productos/';
  producto: Product = {
  }
  modProd: Product = {
  }
  modificando:boolean;
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
  hayFoto:boolean=true;
  id:number;

 

  constructor(
    private prodSrv: ProductsService,
    private photoSrv: PhotoService,
    private catSrv: CategoriesService,
    private catProdSrv: CatProdService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      id:[null],
      nombreProd: [''] ,
      precio: [null] ,
      stock: [null]
    })

    this.catSrv.getCategories().subscribe(
      (res: Categoria[]) => {
        this.categorias = res
      }
    )

    //Comprobar si hay un producto para modificar
    if(this.route.snapshot.paramMap.get('id')){
      this.modificando = true ;
      this.id=+this.route.snapshot.paramMap.get('id')
      this.prodSrv.getProduct(this.id).subscribe(
        (res: Product) => {
          this.modProd = res[0]
          this.form.patchValue({
            id:this.modProd.id,
            nombreProd:this.modProd.nombreProd ,
            precio: this.modProd.precio ,
            stock: this.modProd.stock
          })
        }
      )
    }
    
  }

  onPhotoSelected(event: HtmlInputEvent | any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0]
      //image preview
      const reader = new FileReader;
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file)
      this.hayFoto=true;
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

  saveNewProduct(f: any) {

    if(this.modificando){

      if (this.categoriasSelected.length > 0) {
        let myNewFile;
        if (this.file) {
          let arr = this.file.name.split(".");
          let ext = arr.pop()
          myNewFile = new File([this.file], uuid() + '.' + ext)
  
          this.modProd = {
            id: this.form.value.id,
            nombreProd: f.value.nombreProd,
            precio: f.value.precio,
            stock: f.value.stock,
            foto: myNewFile.name,
          }
        }else{

          this.modProd = {
            id: this.form.value.id,
            nombreProd: f.value.nombreProd,
            precio: f.value.precio,
            stock: f.value.stock,
            foto: this.modProd.foto,
          }

        }
  
          this.prodSrv.saveProduct(this.modProd).subscribe(
            res => {
              if(this.file){
              this.photoSrv.createProdPhoto(myNewFile).subscribe(res => console.log(res), err => console.log(err))}
  
              for (let i = 0; i < this.categoriasSelected.length; i++) {
                let catprod: CatProd = {
                  id_prod: this.form.value.id,
                  id_cat: this.categoriasSelected[i]
                }
                this.catProdSrv.delete(catprod.id_prod).subscribe(res => console.log(res), err => console.log(err))
                this.catProdSrv.create(catprod).subscribe(res => console.log(res), err => console.log(err))
              }
            },
            err => console.log(err)
          )

          Swal.fire({
            title: 'Producto actualizado con éxito.',
            text: "¿Ahora que quieres hacer?",
            showDenyButton: true,
            confirmButtonText: 'Crear otro producto',
            denyButtonText: `Ir a productos`,
          }).then((result) => {
  
            if (result.isConfirmed) {
              this.router.navigate(['/admin/productos/add']);
            } else if (result.isDenied) {
              this.router.navigate(['/admin/plist']);
            }
          })
  
      } else {
        this.catError = true;
      }

    }else{
      if (this.categoriasSelected.length > 0) {
        if (this.file) {
          let arr = this.file.name.split(".");
          let ext = arr.pop()
          const myNewFile = new File([this.file], uuid() + '.' + ext)
  
          this.producto = {
            nombreProd: f.value.nombreProd,
            precio: f.value.precio,
            stock: f.value.stock,
            foto: myNewFile.name,
          }
  
          this.prodSrv.saveProduct(this.producto).subscribe(
            res => {
              this.newProdId = res
              this.photoSrv.createProdPhoto(myNewFile).subscribe(res => console.log(res), err => console.log(err))
  
              for (let i = 0; i < this.categoriasSelected.length; i++) {
                let catprod: CatProd = {
                  id_prod: this.newProdId.insertId,
                  id_cat: this.categoriasSelected[i]
                }
                this.catProdSrv.create(catprod).subscribe(res => console.log(res), err => console.log(err))
              }
            },
            err => console.log(err)
          )

          Swal.fire({
            title: 'Producto creado con éxito.',
            text: "¿Ahora que quieres hacer?",
            showDenyButton: true,
            confirmButtonText: 'Crear otro producto',
            denyButtonText: `Ir a productos`,
          }).then((result) => {
  
            if (result.isConfirmed) {
              window.location.reload()
            } else if (result.isDenied) {
              this.router.navigate(['/admin/plist']);
            }
          })
  
        } else {
          this.fileError = true
        }
      } else {
        this.catError = true;
      }
    }

    

  }

}
