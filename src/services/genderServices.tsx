import axios from 'axios';
import { APIURL } from '../utils/environments';
import { Catch } from '../utils/catch';

export const getGenders = async () => {
    try {
        const request = await axios.get(`${APIURL}api/Genero`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}