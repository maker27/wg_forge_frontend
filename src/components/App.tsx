import React from 'react';

import OrdersList from './OrdersList';
import { GlobalContext } from '../context';
import orders from '../../data/orders.json';
import users from '../../data/users.json';
import companies from '../../data/companies.json';

const App: React.FC = () => {
    return (
        <GlobalContext.Provider value={{ orders, users, companies }}>
            <div className="container">
                <OrdersList />
            </div>
        </GlobalContext.Provider>
    );
};

export default App;
