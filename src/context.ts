import { createContext, useContext } from 'react';
import { IOrder, IUser, ICompany } from './models';

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
