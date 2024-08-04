import axios from 'axios';
import { APIURL } from '../utils/environments';
import { Catch } from '../utils/catch';
import { ISchedules } from '../Interfaces/ISchedules';

export const getSchedules = async () => {
    try {
        const request = await axios.get(`${APIURL}api/Horario`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const postSchedules = async (data: ISchedules) => {
    try {
        const request = await axios.post(`${APIURL}api/Horario`, data);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const putSchedules = async (data: ISchedules) => {
    try {
        const request = await axios.put(`${APIURL}api/Horario`, data);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}