import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/Pedido';
import Usuario from 'src/app/models/Usuario';
import { AccountService } from 'src/app/services/account.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css']
})
export class PedidoDetalleComponent implements OnInit {
  
  idPedido:number;
  precioTotal:number;
  imageUrl: string = environment.imageUrl + '/productos/';
  detallesPedidos:any[]=[];

  constructor(
    private route: ActivatedRoute,
    private pedidosSrv: PedidosService,) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id')
    
    this.pedidosSrv.getDetallePedido(id).subscribe(
      (res:any[]) => {
        this.detallesPedidos = res
        this.idPedido=this.detallesPedidos[0].idPed
        this.precioTotal=this.detallesPedidos[0].precioTotal
        
      })
  }

}
