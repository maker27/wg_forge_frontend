import React from 'react';

import OrdersList from './OrdersList';
import orders from '../../data/orders.json';

const App: React.FC = () => {
    return (
        <div className="container">
            <OrdersList orders={orders} />
        </div>
    );
};

export default App;
