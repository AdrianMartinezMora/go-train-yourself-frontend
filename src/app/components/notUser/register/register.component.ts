import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Usuario from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PhotoService } from 'src/app/services/photo.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Md5 } from 'md5-typescript';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Usuario = {};

  usuarios: Usuario[] = []

  invalidUsername: boolean = false;
  invalidEmail: boolean = false;
  file: File | undefined;
  photoSelected: string | ArrayBuffer | null | undefined;

  constructor(
    private usuarioSrv: UsuariosService, 
    private photoSrv: PhotoService,
    private router: Router) {
    this.invalidUsername = false;
    this.invalidEmail = false;
  }

  ngOnInit(): void {
    this.usuarioSrv.getUsuarios().subscribe(
      (res: Usuario[]) => {
        this.usuarios = res
      }
    )
  }

  onPhotoSelected(event: HTMLInputElement | any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0]
      //image preview
      const reader = new FileReader;
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file)
    }
  }


  onSubmit(f: NgForm) {
    let myNewFile=null;
    if (this.file) {
      let arr = this.file.name.split(".");
      let ext = arr.pop()
      myNewFile = new File([this.file], uuid() + '.' + ext)

      this.user = {
        nombreCompleto: f.value.realname,
        nombreUsuario: f.value.username,
        correo: f.value.email,
        password: Md5.init(f.value.password),
        foto: myNewFile.name
      }

    } else {
      this.user = {
        nombreCompleto: f.value.realname,
        nombreUsuario: f.value.username,
        correo: f.value.email,
        password: Md5.init(f.value.password),
        foto:'default.png'
      }
    }

    this.invalidUsername = false;
    for (let i = 0; i < this.usuarios.length; i++) {
      let catname = this.usuarios[i].nombreUsuario.toLowerCase();
      let name = f.value.username.toLowerCase();
      if (catname == name) {
        this.invalidUsername = true;
      }
    }

    this.invalidEmail = false;
    for (let i = 0; i < this.usuarios.length; i++) {
      let catname = this.usuarios[i].correo.toLowerCase();
      let name = f.value.email.toLowerCase();
      if (catname == name) {
        this.invalidEmail = true;
      }
    }
    
    if (!this.invalidUsername && !this.invalidEmail) {
      this.usuarioSrv.register(this.user).subscribe(
        (resp) => {
          if(this.file){this.photoSrv.createUserPhoto(myNewFile).subscribe(res => console.log(res), err => console.log(err))}
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