import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Usuario from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Md5 } from 'md5-typescript';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Usuario = {};

  invalidUsername: boolean = false;
  invalidEmail: boolean = false;

  constructor(private usuarioSrv: UsuariosService, private router: Router) {
    this.invalidUsername = false;
    this.invalidEmail = false;
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.user = {
      nombreCompleto: f.value.realname,
      nombreUsuario: f.value.username,
      correo: f.value.email,
      password: Md5.init(f.value.password)
    }

    this.usuarioSrv.validUsername(f.value.username).subscribe(
      (resp) => {
        if (resp = "invalid") {
          this.invalidUsername = true;
        } else {
          this.invalidUsername = false;
        }
      }
    )

    this.usuarioSrv.validEmail(f.value.email).subscribe(
      (resp) => {
        if (resp = "invalid") {
          this.invalidEmail = true;
        } else {
          this.invalidEmail = false;
        }
      }
    )

    
    if (!this.invalidUsername && !this.invalidEmail) {
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
    }
 
  }
}