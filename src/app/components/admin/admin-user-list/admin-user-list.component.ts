import { Component, OnInit } from '@angular/core';
import Usuario from 'src/app/models/Usuario';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  search: string = '';
  usuarios: Usuario[] = [];
  showUsuarios: Usuario[] = [];
  imageUrl: string = environment.imageUrl + '/usuarios/';

  constructor(
    private usuarioSrv: UsuariosService
    ) { }

  ngOnInit(): void {
    this.usuarioSrv.getUsuarios().subscribe(
      (res: Usuario[]) => {
        this.usuarios = res
        this.showUsuarios = res
      }
    )
    
  }

  filter(){
    this.showUsuarios = this.usuarios.filter(p => {
      return p.nombreUsuario.toLowerCase().includes(this.search.toLowerCase());
    });
  }

  deleteUser(idUser: number) {

    Swal.fire({
      title: 'Eliminar Usuario?',
      text: "Esta acción no podrá ser revertida",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.usuarioSrv.deleteUsuario(idUser).subscribe(
          (resp) => {
            let element = this.usuarios.filter((e: any) => e.id == idUser)[0];
            this.usuarios.splice(this.usuarios.indexOf(element), 1)
            this.showUsuarios = this.usuarios

            Swal.fire(
              'Eliminado!',
              'El usuario se ha eliminado con éxito',
              'success'
            )

          },
          (err) => {

            Swal.fire(
              'Error',
              'No se ha podido eliminar',
              'error'
            )

          },
          () => { }
        )


      }
    })
  }

}
