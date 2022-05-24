import { Injectable } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categoria } from 'src/app/models/Categtoria';
import { BehaviorSubject } from 'rxjs';
import Menu from '../models/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  userOnAdmin: Boolean = false;

  menu: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);

  menuAdmin: Menu[] = [
    {
      name: "Productos",
      link: '',
      visible: false,
      children: [
        {
          name: "Ver todos",
          link: "/admin/plist",
          visible: true
        },
        {
          name: "Crear Producto",
          link: "/admin/productos/add",
          visible: true
        }
      ]
    },
    {
      name: "Usuarios",
      link: '/admin/userlist',
      visible: false,
    },
    {
      name: "Categorías",
      link: '',
      visible: false,
      children: [
        {
          name: "Ver todas",
          link: "/admin/catlist",
          visible: true
        },
        {
          name: "Crear Categoría",
          link: "/admin/categorias/add",
          visible: true
        }
      ]
    },
    {
      name: "Pedidos",
      link: '/admin/orderList',
      visible: false
    }
  ];

  constructor(private categoriesSrv: CategoriesService) {
  }

  public loadMenu() {
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
        link: '',
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
