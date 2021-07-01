import React from 'react';
import Order from './Order';
import { IOrder } from '../models/order';
import { IUser } from '../models/user';

export default function OrdersList({ orders, users }: { orders: IOrder[]; users: IUser[] }) {
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
                    <Order key={order.id} data={order} users={users} />
                ))}
            </tbody>
        </table>
    );
}
