import axios from 'axios';
import { APIURL } from '../utils/environments';
import { Catch } from '../utils/catch';

export const getCategory = async () => {
    try {
        const request = await axios.get(`${APIURL}api/Categoria`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}