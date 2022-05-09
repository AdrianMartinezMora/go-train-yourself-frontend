import { Component, OnInit } from '@angular/core';
import Menu from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/menu.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  menus: Menu[] = [];

  constructor(
    private usuarioSrv: UsuariosService,
    public menuSrv: MenuService) {
   }

  ngOnInit(): void {
    this.menuSrv.loadMenu();
    this.menuSrv.getMenu.subscribe(menus => {
      this.menus = menus;
    });
  }

  doLogin(){
    //TODO: TOCA ESTO PERRO
    let username = 'admin';
    let password = 'pass';

    this.usuarioSrv.login(username, password).subscribe(data => {
      Swal.fire({title: 'Logged successfully', text: '', icon: 'success'});
    },
    error => {
      Swal.fire({title: error.error,  icon: 'error'});
    });
  }


}
