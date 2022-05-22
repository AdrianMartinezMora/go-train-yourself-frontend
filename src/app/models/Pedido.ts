import { DetallePedido } from "./DetallePedido";

export interface Pedido {
    id?: number;
    idUsuario?: number;
    precioTotal?: number;
    locEntrega?: string;
    detalle: DetallePedido[];
}