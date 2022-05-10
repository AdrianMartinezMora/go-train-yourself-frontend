import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Usuario from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Md5 } from 'md5-typescript';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  badUser:boolean=false;

  user:Usuario={};

  constructor(private usuarioSrv: UsuariosService,private router: Router) { 
    this.badUser=false;
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    this.usuarioSrv.login(f.value.username,Md5.init(f.value.password)).subscribe(
      (resp) => {
        this.router.navigate(['/']);
      },
      (err)=> {
        this.badUser=true;
      }

    )
  }

}
