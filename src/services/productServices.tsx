import axios from 'axios';
import { APIURL } from '../utils/environments';
import { Catch } from '../utils/catch';
import { IProducts } from '../Interfaces/IProducts';

export const getProducts = async () => {
    try {
        const request = await axios.get(`${APIURL}api/Producto`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const postProduct = async (data: IProducts) => {
    try {
        const request = await axios.post(`${APIURL}api/Producto`, data);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const putProduct = async (data: IProducts) => {
    try {
        const request = await axios.put(`${APIURL}api/Producto`, data);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}