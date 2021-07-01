import React from 'react';

import OrdersList from './OrdersList';
import orders from '../../data/orders.json';
import users from '../../data/users.json';

const App: React.FC = () => {
    return (
        <div className="container">
            <OrdersList orders={orders} users={users} />
        </div>
    );
};

export default App;
