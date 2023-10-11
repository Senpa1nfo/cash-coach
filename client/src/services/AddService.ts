import $api from "../http";
import {AxiosResponse} from 'axios';
import { IUser } from "../models/IUser.ts";
export default class AddService {
    static async add(description: string, value: string, bool: boolean): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>('/add', {description, value, bool});
    }

    static async delete(_id: string): Promise<void> {
        return $api.post('/delete', {_id});
    }

    static async edit(_id: string, description: string, value: string, bool: boolean): Promise<void> {
        return $api.post('/edit', {_id, description, value, bool});
    }

    static async generate_list() {
        return $api.get('/generate-list');
    }
}