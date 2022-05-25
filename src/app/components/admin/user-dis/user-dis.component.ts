import { Component, OnInit } from '@angular/core';
import Usuario from 'src/app/models/Usuario';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-user-dis',
  templateUrl: './user-dis.component.html',
  styleUrls: ['./user-dis.component.css']
})
export class UserDisComponent implements OnInit {

  search: string = '';
  usuarios: Usuario[] = [];
  showUsuarios: Usuario[] = [];
  imageUrl: string = environment.imageUrl + '/usuarios/';

  constructor(
    private usuarioSrv: UsuariosService
    ) { }

  ngOnInit(): void {
    this.usuarioSrv.getDisUsuarios().subscribe(
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

  enableUser(idUser: number) {

    Swal.fire({
      title: '¿Restaurar Usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.usuarioSrv.enableUsuario(idUser).subscribe(
          (resp) => {
            let element = this.showUsuarios.filter((e: any) => e.id == idUser)[0];
            this.showUsuarios.splice(this.showUsuarios.indexOf(element), 1)

            Swal.fire(
              '¡Restaurado!',
              'El usuario se ha restaurado con éxito',
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
