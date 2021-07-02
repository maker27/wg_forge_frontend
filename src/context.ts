import { createContext, useContext } from 'react';
import { IOrder } from './models/order';
import { IUser } from './models/user';
import { ICompany } from './models/company';

export type GlobalContent = {
    orders: IOrder[];
    users: IUser[];
    companies: ICompany[];
};

export const GlobalContext = createContext<GlobalContent>({
    orders: [],
    users: [],
    companies: []
});

export const useGlobalContext = () => useContext(GlobalContext);
