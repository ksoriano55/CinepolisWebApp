import axios from 'axios';
import { APIURL } from '../utils/environments';
import { Catch } from '../utils/catch';
import { IPrice } from '../Interfaces/IPrices';

export const getPrices = async () => {
    try {
        const request = await axios.get(`${APIURL}api/Precios`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const postPrices = async (data: IPrice) => {
    try {
        const request = await axios.post(`${APIURL}api/Precios`, data);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const putPrices = async (data: IPrice) => {
    try {
        const request = await axios.put(`${APIURL}api/Precios`, data);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}