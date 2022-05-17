import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria } from 'src/app/models/Categtoria';
import { v4 as uuid } from 'uuid';

import { CategoriesService } from 'src/app/services/categories.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-admin-cat-form',
  templateUrl: './admin-cat-form.component.html',
  styleUrls: ['./admin-cat-form.component.css']
})
export class AdminCatFormComponent implements OnInit {

  categoria: Categoria = {

  }

  categorias: Categoria[] = []

  fileError: boolean = false;
  file: File | undefined;
  photoSelected: string | ArrayBuffer | null | undefined;
  primaria: boolean = false;
  invalidName: boolean = false;

  constructor(
    private catSrv: CategoriesService,
    private router: Router,
    private photoSrv: PhotoService) {
    this.invalidName = false;
  }

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


  onSubmit(f: NgForm) {

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
