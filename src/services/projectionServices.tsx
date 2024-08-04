import axios from 'axios';
import { APIURL } from '../utils/environments';
import { Catch } from '../utils/catch';
import { IProjection } from '../Interfaces/IProjection';

export const getProjection = async () => {
    try {
        const request = await axios.get(`${APIURL}api/TipoProyeccion`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const postProjection = async (data:IProjection) => {
    try {
        const request = await axios.post(`${APIURL}api/TipoProyeccion`,data);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const putProjection = async () => {
    try {
        const request = await axios.put(`${APIURL}api/TipoProyeccion`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}