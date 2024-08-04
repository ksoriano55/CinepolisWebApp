import axios from 'axios';
import { APIURL } from '../utils/environments';
import { Catch } from '../utils/catch';

export const getmovieType = async () => {
    try {
        const request = await axios.get(`${APIURL}api/TipoPelicula`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}