export default interface Usuario {
    id?: number;
    nombreCompleto?: string;
    nombreUsuario?: string;
    correo?: string;
    password?: string;
    fechaAlta?: Date;
    admin?: boolean;
    foto?: string;
    estado?: boolean;
}