import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/Pedido';
import Usuario from 'src/app/models/Usuario';
import { AccountService } from 'src/app/services/account.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})
export class AdminOrderListComponent implements OnInit {

  pedidos:any[]=[];
  pedidosMostrar:any[]=[]
  usuarios:Usuario[]=[];
  usuario:Usuario;

  constructor(
    private userSrv: UsuariosService,
    private pedidosSrv: PedidosService) { }

  ngOnInit(): void {


    this.userSrv.getUsuarios().subscribe((res:Usuario[]) => {
      this.usuarios=res
      this.pedidosSrv.getPedidos().subscribe(
        (res:Pedido[]) => {
          this.pedidos = res
          console.log(this.pedidos);
          
          for (let i = 0; i < this.pedidos.length; i++) {
            let date=this.pedidos[i].fechaPedido.toString().split("-");
            date=date[2].split("T")[0] + "/" +date[1] + "/" + date[0]
            this.usuario = this.usuarios.find(usu => usu.id==this.pedidos[i].idUsuario)
            let ped={
              id:this.pedidos[i].id,
              usuario:this.usuario.nombreUsuario,
              fecha:date,
              precioTotal:this.pedidos[i].precioTotal,
            }
            this.pedidosMostrar.push(ped)
            
            
          }
        })
      }
    )
  }

}
