import axios from 'axios';
import { APIURL } from '../utils/environments';
import { Catch } from '../utils/catch';

export const getCinema = async () => {
    try {
        const request = await axios.get(`${APIURL}api/Cines`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const postCinema = async () => {
    try {
        const request = await axios.post(`${APIURL}api/Cines`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const putCinema = async () => {
    try {
        const request = await axios.put(`${APIURL}api/Cines`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}