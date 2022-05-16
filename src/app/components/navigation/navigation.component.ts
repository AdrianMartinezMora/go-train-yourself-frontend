import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import Menu from 'src/app/models/Menu';
import Usuario from 'src/app/models/Usuario';
import { AccountService } from 'src/app/services/account.service';
import { MenuService } from 'src/app/services/menu.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  usuario: Usuario;

  visibleSearch: boolean = false;

  menuType: string = 'normalMenu';

  menus: Menu[] = [];

  constructor(
    private menuSrv: MenuService,
    private accountSrv: AccountService,
    private productsSrv: ProductsService,
    private router: Router) {
  }

  ngOnInit(): void {
    
    this.menuSrv.loadMenu();
    this.menuSrv.getMenu.subscribe(menus => {
      this.menus = menus;
      this.menuType = 'normalMenu'

    });

    this.usuario = this.accountSrv.usuarioValue;
    this.accountSrv.usuario$.subscribe(usuario => {
      this.usuario = usuario;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('admin')) {
          this.menuSrv.menu.next(this.menuSrv.menuAdmin)
          this.menuType = 'adminMenu'
        } else {
          this.menuSrv.loadMenu();
          this.menuType = 'normalMenu'
        }
      }
    })
  }

  onSearch(f: NgForm) {

    this.productsSrv.getProductsbySearch(f.value.search).subscribe(
      (resp) => {
        console.log(resp)
      },
      (err) => {
        console.log("vaya error nene")
      }
    )
  }

  goAdmin() {
    this.router.navigate(['/admin/plist']);
  }

  goHome() {
    this.router.navigate(['/productos']);
  }

  logOut() {
    this.accountSrv.logout();
  }

}
