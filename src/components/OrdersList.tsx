import React from 'react';
import Order from './Order';
import { useGlobalContext } from '../context';

export default function OrdersList() {
    const { orders } = useGlobalContext();
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Transaction ID</th>
                    <th scope="col">User Info</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Order Amount</th>
                    <th scope="col">Card Number</th>
                    <th scope="col">Card Type</th>
                    <th scope="col">Location</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <Order key={order.id} data={order} />
                ))}
            </tbody>
        </table>
    );
}
