import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  productos: any = []

  constructor(
    private usuarioSrv: UsuariosService,
    public menuSrv: MenuService,
    private productSrv: ProductsService) {

   }

  ngOnInit(): void {
  }

  changeProd(id:any){

    this.productSrv.getProductsbyCategoria(id).subscribe(
      res => {
        this.productos = res
        console.log(this.productos)
      },
      err => console.error(err)
    );
    

  }

  doLogin(){
    //TODO: TOCA ESTO PERRO
    let username = 'admin';
    let password = 'pass';

    this.usuarioSrv.login(username, password).subscribe(data => {
      Swal.fire({title: 'Logged successfully', text: '', icon: 'success'});
    },
    error => {
      Swal.fire({title: error.error,  icon: 'error'});
    });
  }


}
