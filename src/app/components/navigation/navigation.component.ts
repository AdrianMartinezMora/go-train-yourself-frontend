import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Menu from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/menu.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  userLogged:Boolean=true;

  visibleSearch:boolean=false;

  menus: Menu[] = [];

  constructor(
    public menuSrv: MenuService,public productsSrv: ProductsService) {
   }

  ngOnInit(): void {
    this.menuSrv.loadMenu();
    this.menuSrv.getMenu.subscribe(menus => {
      this.menus = menus;
    });
  }

  onSearch(f:NgForm){

    this.productsSrv.getProductsbySearch(f.value.search).subscribe(
      (resp) => {
        console.log(resp)
      },
      (err)=> {
        console.log("vaya error nene")
      }
    )
  }

}
