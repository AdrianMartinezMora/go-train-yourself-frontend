import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categtoria';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css']
})
export class CatListComponent implements OnInit {
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

  goProdCat(id: number) {
    this.router.navigate(['/productos/categorias/'+id])
  }


}
