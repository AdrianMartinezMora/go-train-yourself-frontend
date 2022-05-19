import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Usuario from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  id: number;
  usuario: Usuario = {}
  imageUrl: string = environment.imageUrl + '/usuarios/';
  fecha: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userSrv: UsuariosService) { }

  ngOnInit(): void {
    //Comprobar si hay una categoria para modificar
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = +this.route.snapshot.paramMap.get('id')
      this.userSrv.getUsuario(this.id).subscribe(
        (res: Usuario) => {
          this.usuario = res[0]
          let date=this.usuario.fechaAlta.toString().split("-");
          this.fecha=date[2].split("T")[0] + "/" +date[1] + "/" + date[0]
          

        }
      )
    }
  }

}
