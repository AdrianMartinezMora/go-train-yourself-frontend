import { Injectable } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categoria } from 'src/app/models/Categtoria';
import { UsuariosService } from './usuarios.service';
import { BehaviorSubject } from 'rxjs';
import Menu from '../models/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);

  menuAdmin: Menu[] = [
    {
      name: "Productos",
      link: "/productos",
      visible: false,
      children: [
        {
          name: "Ver todos",
          link: "/productos",
          visible: true
        },
        {
          name: "Crear Producto",
          link: "/productos/add",
          visible: true
        }
      ]
    }
  ];

  constructor(private categoriesSrv: CategoriesService) {
  }

  public loadMenu() {
    //TODO: Añadir condición para cargar un menu u otro segun si el usuario ha iniciado sesión
    this.categoriesSrv.getCategories().subscribe(categorias => {
      let finalMenu: Menu[] = categorias.filter(c => c.primaria && c.estado).map(categoria => {
        return this.transform(categoria);
      });

      let secundarias: Menu[] = categorias.filter(c => !c.primaria && c.estado).map(categoria => {
        return this.transform(categoria);
      });

      finalMenu.push({
        name: 'Otras categorias',
        visible: false,
        link:'',
        children: secundarias
      });

      this.menu.next(finalMenu);
    });
  }

  private transform(categoria: Categoria): Menu {
    let resultado: Menu = {
      name: categoria.nombre,
      link: `/productos/categorias/${categoria.id}`,
      visible: false
    }
    return resultado;
  }
  public get getMenu() {
    return this.menu
  }
}
