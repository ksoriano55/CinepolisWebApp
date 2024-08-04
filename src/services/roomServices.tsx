import axios from 'axios';
import { APIURL } from '../utils/environments';
import { Catch } from '../utils/catch';
import { IRoom } from '../Interfaces/IRoom';

export const getRooms = async () => {
    try {
        const request = await axios.get(`${APIURL}api/Salas`);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const postRooms = async (data: IRoom) => {
    try {
        const request = await axios.post(`${APIURL}api/Salas`, data);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}

export const putRooms = async (data: IRoom) => {
    try {
        const request = await axios.put(`${APIURL}api/Salas`, data);
        return request.data.data;
    } catch (error: any) {
        Catch(error);
    }
}