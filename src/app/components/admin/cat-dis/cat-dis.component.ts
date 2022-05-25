import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categtoria';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-dis',
  templateUrl: './cat-dis.component.html',
  styleUrls: ['./cat-dis.component.css']
})
export class CatDisComponent implements OnInit {

  search: string = '';
  categorias: Categoria[] = [];
  showCategorias: Categoria[] = [];
  imageUrl: string = environment.imageUrl + '/categorias/';

  constructor(
    private catSrv: CategoriesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.catSrv.getDisCategorias().subscribe(
      (res: Categoria[]) => {
        this.categorias = res
        this.showCategorias = res
      }
    )
    
  }

  filter(){
    this.showCategorias = this.categorias.filter(p => {
      return p.nombre.toLowerCase().includes(this.search.toLowerCase());
    });
  }

  enableCat(idCat: number) {

    Swal.fire({
      title: '¿Restaurar Categoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.catSrv.enableCat(idCat).subscribe(
          (resp) => {
            let element = this.showCategorias.filter((e: any) => e.id == idCat)[0];
            this.showCategorias.splice(this.showCategorias.indexOf(element), 1)

            Swal.fire(
              'Restaurada!',
              'La categoria se ha restaurado con éxito',
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
