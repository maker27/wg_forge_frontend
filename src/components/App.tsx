import React, { useEffect, useState } from 'react';

import { GlobalContext } from '../context';
import { getCompanies, getOrders, getUsers } from '../api';
import { IOrder, IUser, ICompany } from '../models';
import ErrorsList from './ErrorsList';
import OrdersList from './OrdersList';
import LoadingIndicator from './LoadingIndicator';

const App: React.FC = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [companies, setCompanies] = useState<ICompany[]>([]);

    useEffect(() => {
        getOrders()
            .then(ordersList => setOrders(ordersList))
            .catch(() =>
                setErrors(prevErrors => [...prevErrors, 'Error occurred while getting the list ORDERS'])
            );
        getUsers()
            .then(usersList => setUsers(usersList))
            .catch(() =>
                setErrors(prevErrors => [...prevErrors, 'Error occurred while getting the list USERS'])
            );
        getCompanies()
            .then(companiesList => setCompanies(companiesList))
            .catch(() =>
                setErrors(prevErrors => [...prevErrors, 'Error occurred while getting the list COMPANIES'])
            );
    }, []);

    const allDataCount = 3;
    const loadedDataCount = +(orders.length > 0) + +(users.length > 0) + +(companies.length > 0);
    const loadingCompleted = loadedDataCount + errors.length >= allDataCount;

    return (
        <GlobalContext.Provider value={{ orders, users, companies }}>
            <div className="container">
                <ErrorsList errors={errors} />
                {loadingCompleted ? (
                    <OrdersList />
                ) : (
                    <LoadingIndicator percent={(loadedDataCount * 100) / allDataCount} />
                )}
            </div>
        </GlobalContext.Provider>
    );
};

export default App;
