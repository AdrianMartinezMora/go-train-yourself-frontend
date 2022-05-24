import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/Pedido';
import Usuario from 'src/app/models/Usuario';
import { AccountService } from 'src/app/services/account.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css']
})
export class PedidosListComponent implements OnInit {

  pedidos:any[]=[];
  pedidosMostrar:any[]=[]
  usuario:Usuario;

  constructor(
    private route: ActivatedRoute,
    private pedidosSrv: PedidosService,
    private accountSrv: AccountService) {}

  ngOnInit(): void {
    this.usuario = this.accountSrv.usuarioValue
    let id = +this.route.snapshot.paramMap.get('id')
    this.pedidosSrv.getUsuarioPedidos(id).subscribe(
      (res:Pedido[]) => {
        this.pedidos = res
        for (let i = 0; i < this.pedidos.length; i++) {
          let date=this.pedidos[i].fechaPedido.toString().split("-");
          date=date[2].split("T")[0] + "/" +date[1] + "/" + date[0]
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

}
