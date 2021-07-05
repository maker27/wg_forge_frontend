import { apiPrefixUrl } from './assets/constants';
import { ICompany, IOrder, IUser } from './models';

const axios = require('axios');

function apiRequest<T>(fileName: string): Promise<T[]> {
    return axios.get(`${apiPrefixUrl}${fileName}.json`).then(function ({ data }: { data: T[] }) {
        return data;
    });
}

export function getOrders(): Promise<IOrder[]> {
    return apiRequest<IOrder>('orders');
}

export function getUsers(): Promise<IUser[]> {
    return apiRequest<IUser>('users');
}

export function getCompanies(): Promise<ICompany[]> {
    return apiRequest<ICompany>('companies');
}
