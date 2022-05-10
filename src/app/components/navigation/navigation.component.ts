import { Component, OnInit } from '@angular/core';
import Menu from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  menus: Menu[] = [];

  constructor(
    public menuSrv: MenuService) {
   }

  ngOnInit(): void {
    this.menuSrv.loadMenu();
    this.menuSrv.getMenu.subscribe(menus => {
      this.menus = menus;
    });
  }

}
