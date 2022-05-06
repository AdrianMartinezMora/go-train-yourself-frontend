import { Injectable } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  menu:any[] = [
    {
      id: 0,
      name: "BOXEO",
      link: "/productos/boxeo",
      visible: false
    },
    {
      id: 1,
      name: "MUAI THAI",
      link: "/productos/muai",
      visible: false
    },
    {
      id: 2,
      name: "MMA",
      link: "/productos/mma",
      visible: false
    },
    {
      id: 3,
      name: "JIU-JITSU",
      link: "/productos/jj",
      visible: false
    },
    {
      name: "Otras Categorias",
      link: "",
      visible: false,
      dropdown: true,
      children: []
    }

  ];

  menuAdmin: any[] = [
    {
      name: "Productos",
      link: "/productos",
      visible: false,
      children: [
        {
          name: "Ver todos",
          link: "/productos"
        },
        {
          name: "Crear Producto",
          link: "/productos/add"
        }
      ]
    }
  ];

  catDropdown(): void {
    this.categoriesSrv.getChildren().subscribe(
      res => {
        this.menu[4].children=res
      },
      err => console.error(err)
    );
  }

  constructor(private categoriesSrv: CategoriesService) {

    this.catDropdown();


    

  }

  public get getMenu() {
    return this.menu
   }
}
