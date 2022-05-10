import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioSrv: UsuariosService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    this.usuarioSrv.login(f.value.username,f.value.password).subscribe(
      (resp) => {
        
          console.log(resp)
        
      }
    )
  }

}
