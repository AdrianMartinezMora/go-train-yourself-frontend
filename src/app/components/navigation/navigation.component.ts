import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Menu from 'src/app/models/Menu';
import Usuario from 'src/app/models/Usuario';
import { AccountService } from 'src/app/services/account.service';
import { MenuService } from 'src/app/services/menu.service';
import { DOCUMENT } from '@angular/common';

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
    private router: Router,
    @Inject(DOCUMENT) document: any) {
  }

  ngOnInit(): void {
    
    this.menuSrv.getMenu.subscribe(menus => {
      this.menus = menus;
      this.menuType = 'normalMenu'

    });

    this.usuario = this.accountSrv.usuarioValue;
    this.accountSrv.usuario$.subscribe(usuario => {
      this.usuario = usuario;
    });

    if (document.location.href.includes('admin')) {
      console.log("Esta entrando xd");
      this.menuSrv.menu.next(this.menuSrv.menuAdmin)
      this.menuType = 'adminMenu'
    } else {
      this.menuSrv.loadMenu();
      this.menuType = 'normalMenu'
    }

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
