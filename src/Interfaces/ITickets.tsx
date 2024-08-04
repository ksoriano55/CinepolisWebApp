export interface ITickets {
    ventaId: number,
    sala: string,
    proyeccion: string,
    genero: string,
    fecha: Date,
    titulo: string,
    boletos: Array<IDetails>
}

export interface IDetails {
    ventaDetalleId: number,
    ventaId: number,
    numeroBoleto: string,
    precio: number,
    cantidad: number
}