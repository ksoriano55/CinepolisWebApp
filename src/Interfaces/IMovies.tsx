import { IGender } from "./IGender";
import { IMovieType } from "./IMovieType";

export interface IMovies {
    peliculaId: number,
    generoId: number,
    tipoPeliculaId: number,
    titulo: string,
    sinopsis: string,
    hora: number,
    minutos: number,
    fechaLanzamiento: Date,
    foto: string,
    activo: boolean,
    imgBase64?: string,
    genero: IGender,
    tipoPelicula: IMovieType
}