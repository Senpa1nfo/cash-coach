import { makeAutoObservable } from "mobx";
import AddService from "../services/AddService.ts";

export default class HistoryStore {

    constructor() {
        makeAutoObservable(this);
    }

    async add(description: string, value: string, bool: boolean) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            await AddService.add(description, value, bool);
        } catch (error) {
            console.log(error);
        }
    }

    async delete(_id: string) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            await AddService.delete(_id);
        } catch (error) {
            console.log(error);
        }
    }

    async edit(_id: string, description: string, value: string, bool: boolean) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            await AddService.edit(_id, description, value, bool);
        } catch (error) {
            console.log(error);
        }
    }

    async generate_list() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await AddService.generate_list();
            return response.data;      
        } catch (error) {
            console.log(error);
        }
    }
}