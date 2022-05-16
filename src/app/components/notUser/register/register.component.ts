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
        password: Md5.init(f.value.password)
      }
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