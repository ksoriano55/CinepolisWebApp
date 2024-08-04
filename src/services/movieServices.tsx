import axios from 'axios';
import { APIURL } from '../utils/environments';
import { Catch } from '../utils/catch';
import { IMovies } from '../Interfaces/IMovies';

export const getMovies = async () => {
    try {
        const request = await axios.get(`${APIURL}api/Pelicula`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const postMovies = async (movies: IMovies) => {
    try {
        movies.generoId = movies.genero.generoId;
        movies.tipoPeliculaId = movies.tipoPelicula.tipoPeliculaId;
        const request = await axios.post(`${APIURL}api/Pelicula`, movies);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const putMovies = async (movies: IMovies) => {
    try {
        movies.generoId = movies.genero.generoId;
        movies.tipoPeliculaId = movies.tipoPelicula.tipoPeliculaId;
        const request = await axios.put(`${APIURL}api/Pelicula`, movies);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}