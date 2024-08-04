import axios from 'axios';
import { APIURL } from '../utils/environments';
import { Catch } from '../utils/catch';

export const getTickets = async (id: number) => {
    try {
        const request = await axios.get(`${APIURL}api/Ventas/VentaById?ventaId=${id}`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}