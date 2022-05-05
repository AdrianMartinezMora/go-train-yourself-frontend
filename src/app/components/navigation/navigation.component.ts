import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  menus: any[] = [];

  menusAdmin: any[] = [
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

  constructor(private usuarioSrv: UsuariosService) { }

  ngOnInit(): void {
    this.menus = this.menusAdmin;
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
