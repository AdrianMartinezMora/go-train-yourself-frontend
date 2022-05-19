import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import Usuario from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PhotoService } from 'src/app/services/photo.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Md5 } from 'md5-typescript';
import { v4 as uuid } from 'uuid';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Usuario = {};

  modUser: Usuario = {};

  usuarios: Usuario[] = []

  invalidUsername: boolean = false;
  invalidEmail: boolean = false;
  file: File | undefined;
  photoSelected: string | ArrayBuffer | null | undefined;
  imageUrl: string = environment.imageUrl + '/usuarios/';
  form: FormGroup;
  modificando: boolean;
  hayFoto: boolean = true;
  id: number;
  actualUserId:number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usuarioSrv: UsuariosService,
    private photoSrv: PhotoService,
    private router: Router) {
    this.invalidUsername = false;
    this.invalidEmail = false;
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      id: [null],
      registerRealname: [''],
      registerUsername: [''],
      registerEmail: [''],
      registerPassword: [''],
      admin:[null]
    })

    this.usuarioSrv.getUsuarios().subscribe(
      (res: Usuario[]) => {
        this.usuarios = res
      }
    )

    //Comprobar si hay una categoria para modificar
    if (this.route.snapshot.paramMap.get('id')) {
      this.modificando = true;
      this.id = +this.route.snapshot.paramMap.get('id')
      this.usuarioSrv.getUsuario(this.id).subscribe(
        (res: Usuario) => {
          this.user = res[0]
          this.modUser = res[0]
          this.form.patchValue({
            id: this.modUser.id,
            registerRealname: this.modUser.nombreCompleto,
            registerUsername: this.modUser.nombreUsuario,
            registerEmail: this.modUser.correo,
            admin: this.modUser.admin
          })
        }
      )

    }
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


  onSubmit(f: any) {

    if (this.modificando) {
      this.invalidUsername = false;
      for (let i = 0; i < this.usuarios.length; i++) {
        if (f.value.registerUsername != this.user.nombreUsuario) {
          let catname = this.usuarios[i].nombreUsuario.toLowerCase();
          let name = f.value.registerUsername.toLowerCase();
          
          if (catname == name) {
            this.invalidUsername = true;
          }
        }
      }

      this.invalidEmail = false;
      for (let i = 0; i < this.usuarios.length; i++) {
        if (f.value.registerEmail != this.user.correo) {
          let catname = this.usuarios[i].correo.toLowerCase();
          let name = f.value.registerEmail.toLowerCase();
          console.log("Valor de formulario: " + name + ". Valor del Usuario: " + catname);
          if (catname == name) {
            this.invalidEmail = true;
          }
        }
      }

      let myNewFile = null;
      if (this.form.value.registerPassword) {

        if (this.file) {
          let arr = this.file.name.split(".");
          let ext = arr.pop()
          myNewFile = new File([this.file], uuid() + '.' + ext)

          this.modUser = {
            id: this.form.value.id,
            nombreCompleto: f.value.registerRealname,
            nombreUsuario: f.value.registerUsername,
            correo: f.value.registerEmail,
            password: Md5.init(f.value.registerPassword),
            admin:this.form.value.admin,
            foto: myNewFile.name
          }

        } else {
          this.modUser = {
            id: this.form.value.id,
            nombreCompleto: f.value.registerRealname,
            nombreUsuario: f.value.registerUsername,
            correo: f.value.registerEmail,
            password: Md5.init(f.value.registerPassword),
            admin:this.form.value.admin,
            foto: this.modUser.foto
          }
        }
      } else {

        if (this.file) {
          let arr = this.file.name.split(".");
          let ext = arr.pop()
          myNewFile = new File([this.file], uuid() + '.' + ext)

          this.modUser = {
            id: this.form.value.id,
            nombreCompleto: f.value.registerRealname,
            nombreUsuario: f.value.registerUsername,
            correo: f.value.registerEmail,
            password: this.modUser.password,
            admin:this.form.value.admin,
            foto: myNewFile.name
          }

        } else {
          this.modUser = {
            id: this.form.value.id,
            nombreCompleto: f.value.registerRealname,
            nombreUsuario: f.value.registerUsername,
            correo: f.value.registerEmail,
            password: this.modUser.password,
            admin:this.form.value.admin,
            foto: this.modUser.foto
          }
        }


      }

      if (!this.invalidUsername && !this.invalidEmail) {
        this.usuarioSrv.register(this.modUser).subscribe(
          (resp) => {
            if (this.file) { this.photoSrv.createUserPhoto(myNewFile).subscribe(res => console.log(res), err => console.log(err)) }
            Swal.fire({
              title: 'Usuario Actualizado con exito',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ir a perfil'
            }).then((result) => {
              this.router.navigate(['usuario/detalle/'+this.id]);
            })

          }
        )
      }
    } else {
      let myNewFile = null;
      if (this.file) {
        let arr = this.file.name.split(".");
        let ext = arr.pop()
        myNewFile = new File([this.file], uuid() + '.' + ext)

        this.user = {
          nombreCompleto: f.value.registerRealname,
          nombreUsuario: f.value.registerUsername,
          correo: f.value.registerEmail,
          password: Md5.init(f.value.registerPassword),
          foto: myNewFile.name
        }

      } else {
        this.user = {
          nombreCompleto: f.value.registerRealname,
          nombreUsuario: f.value.registerUsername,
          correo: f.value.registerEmail,
          password: Md5.init(f.value.registerPassword),
          foto: 'default.png'
        }
      }

      this.invalidUsername = false;
      for (let i = 0; i < this.usuarios.length; i++) {
        let catname = this.usuarios[i].nombreUsuario.toLowerCase();
        let name = f.value.registerUsername.toLowerCase();
        if (catname == name) {
          this.invalidUsername = true;
        }
      }

      this.invalidEmail = false;
      for (let i = 0; i < this.usuarios.length; i++) {
        let catname = this.usuarios[i].correo.toLowerCase();
        let name = f.value.registerEmail.toLowerCase();
        if (catname == name) {
          this.invalidEmail = true;
        }
      }

      if (!this.invalidUsername && !this.invalidEmail) {
        this.usuarioSrv.register(this.user).subscribe(
          (resp) => {
            if (this.file) { this.photoSrv.createUserPhoto(myNewFile).subscribe(res => console.log(res), err => console.log(err)) }
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
}