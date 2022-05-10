import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Usuario from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:Usuario={};

  usuarioExite:boolean=false;

  constructor(private usuarioSrv: UsuariosService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    this.user={
      nombreCompleto : f.value.realname,
      nombreUsuario : f.value.username,
      correo : f.value.email,
      password : f.value.password
    }
    this.usuarioSrv.registerOk(f.value.username).subscribe(
      (resp) => {
        if(resp == "ok"){
          this.usuarioExite=false;
          this.usuarioSrv.register(this.user).subscribe(
            (resp) => {

              Swal.fire({
                title: 'Usuario Registrado con exito',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ir a login'
              }).then((result) => {
                this.router.navigate(['login']);
              })
              
            }
          )
        }else{
          this.usuarioExite=true;
        }

      }
    )
    

  }

}
