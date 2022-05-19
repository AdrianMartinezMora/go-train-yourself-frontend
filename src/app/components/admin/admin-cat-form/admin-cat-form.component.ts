import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Categoria } from 'src/app/models/Categtoria';
import { v4 as uuid } from 'uuid';

import { CategoriesService } from 'src/app/services/categories.service';
import { PhotoService } from 'src/app/services/photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-admin-cat-form',
  templateUrl: './admin-cat-form.component.html',
  styleUrls: ['./admin-cat-form.component.css']
})
export class AdminCatFormComponent implements OnInit {

  imageUrl: string = environment.imageUrl + '/categorias/';
  categoria: Categoria = {}
  modCat: Categoria = {}
  categorias: Categoria[] = []
  fileError: boolean = false;
  file: File | undefined;
  photoSelected: string | ArrayBuffer | null | undefined;
  primaria: boolean = false;
  invalidName: boolean = false;
  form:FormGroup;
  modificando:boolean;
  hayFoto:boolean=true;
  id:number;

  constructor(
    private formBuilder: FormBuilder,
    private catSrv: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private photoSrv: PhotoService) {
    this.invalidName = false;
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      id: [null],
      nombreCat: [''] ,
      primaria: [null]
    })

    this.catSrv.getCategories().subscribe(
      (res: Categoria[]) => {
        this.categorias = res
      }
    )

    //Comprobar si hay una categoria para modificar
    if(this.route.snapshot.paramMap.get('id')){
      this.modificando = true ;
      this.id=+this.route.snapshot.paramMap.get('id')
      this.catSrv.getCategory(this.id).subscribe(
        (res: Categoria) => {
          this.modCat = res[0]
          this.form.patchValue({
            id:this.modCat.id,
            nombreCat:this.modCat.nombre ,
            primaria: this.modCat.primaria
          })

          if(this.modCat.primaria){
            this.primaria=true
          }
        }
      )
     
    }

  }

  onClick(){
    if(this.primaria){
      this.primaria=false
    }else{
      this.primaria=true
    }
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


  onSubmit(f: any) {
    if(this.modificando){

      this.invalidName = false;
      for (let i = 0; i < this.categorias.length; i++) {
        let catname = this.categorias[i].nombre.toLowerCase();
        let name = f.value.nombreCat.toLocaleLowerCase();
        if(catname === this.modCat.nombre.toLowerCase()){
          this.invalidName = false;
        }else{
          if (catname === name) {
            this.invalidName = true;
          }
        }
        
      }
  
      if (!this.invalidName) {
        
        let myNewFile;

        if (this.file) {
          let arr = this.file.name.split(".");
          let ext = arr.pop()
          myNewFile = new File([this.file], uuid() + '.' + ext)
  
          this.modCat = {
            id: this.form.value.id,
            nombre: f.value.nombreCat,
            foto: myNewFile.name,
            primaria: this.primaria
          }
        }else{
          this.modCat = {
            id: this.form.value.id,
            nombre: f.value.nombreCat,
            foto: this.modCat.foto,
            primaria: this.primaria
          }

        }

        console.log(this.modCat);
        
  
          this.catSrv.saveCat(this.modCat).subscribe(
            res => {
              if(this.file){this.photoSrv.createCatPhoto(myNewFile).subscribe(res => console.log(res), err => console.log(err))}

              Swal.fire({
                title: 'Categoría actualizada con éxito.',
                text: "¿Ahora que quieres hacer?",
                showDenyButton: true,
                confirmButtonText: 'Crear otra Categoría',
                denyButtonText: `Ir a categorias`,
              }).then((result) => {
  
                if (result.isConfirmed) {
                  this.router.navigate(['/admin/categorias/add']);
                } else if (result.isDenied) {
                  this.router.navigate(['/admin/catlist']);
                }
              })
  
            },
            err => console.log(err)
          )
  
      }
    
    }else{
    this.invalidName = false;
    for (let i = 0; i < this.categorias.length; i++) {
      let catname = this.categorias[i].nombre.toLowerCase();
      let name = f.value.catName.toLocaleLowerCase();
      if (catname === name) {
        this.invalidName = true;
      }
    }

    if (!this.invalidName) {
      if (this.file) {
        let arr = this.file.name.split(".");
        let ext = arr.pop()
        const myNewFile = new File([this.file], uuid() + '.' + ext)

        this.categoria = {
          nombre: f.value.catName,
          foto: myNewFile.name,
          primaria: this.primaria
        }

        this.catSrv.saveCat(this.categoria).subscribe(
          res => {
            this.photoSrv.createCatPhoto(myNewFile).subscribe(res => console.log(res), err => console.log(err))
            Swal.fire({
              title: 'Categoría creada con éxito.',
              text: "¿Ahora que quieres hacer?",
              showDenyButton: true,
              confirmButtonText: 'Crear otra Categoría',
              denyButtonText: `Ir a categorias`,
            }).then((result) => {

              if (result.isConfirmed) {
                window.location.reload()
              } else if (result.isDenied) {
                this.router.navigate(['/admin/catlist']);
              }
            })

          },
          err => console.log(err)
        )

      } else { this.fileError = true }

    }
  }
  }

}
