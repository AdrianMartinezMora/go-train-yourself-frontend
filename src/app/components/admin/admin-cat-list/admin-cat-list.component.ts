import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categtoria';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-cat-list',
  templateUrl: './admin-cat-list.component.html',
  styleUrls: ['./admin-cat-list.component.css']
})
export class AdminCatListComponent implements OnInit {

  search: string = '';
  categorias: Categoria[] = [];
  showCategorias: Categoria[] = [];
  imageUrl: string = environment.imageUrl + '/categorias/';

  constructor(
    private catSrv: CategoriesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.catSrv.getCategories().subscribe(
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

  deleteCat(idCat: number) {

    Swal.fire({
      title: '¿Eliminar Categoría?',
      text: "Esta acción no podrá ser revertida",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.catSrv.deleteCat(idCat).subscribe(
          (resp) => {
            let element = this.showCategorias.filter((e: any) => e.id == idCat)[0];
            this.showCategorias.splice(this.showCategorias.indexOf(element), 1)

            Swal.fire(
              'Eliminada!',
              'La categoria se ha eliminado con éxito',
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

  editCat(id: number) {
    this.router.navigate(['/admin/categorias/add/'+id])
  }

}
