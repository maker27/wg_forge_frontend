import React, { useState } from 'react';
import Order from './Order';
import { useGlobalContext } from '../context';
import { IOrder } from '../models/order';
import './OrdersList.scss';
import OrdersListHeader from './OrdersListHeader';
import { IUser } from '../models/user';

interface IOrderWithUser extends IOrder {
    user: IUser;
}

interface ISortingFunction {
    (a: IOrderWithUser, b: IOrderWithUser): number;
}

function sortOrders(orders: IOrderWithUser[], sortingType: string, sortingOrder: boolean): IOrderWithUser[] {
    const compareStrings = (a: string, b: string) => (sortingOrder ? -1 : 1) * (a < b ? -1 : a > b ? 1 : 0);
    const compareNumbers = (a: number, b: number) => (sortingOrder ? -1 : 1) * (a - b);
    const sortingFunctions: { [key in string]: ISortingFunction } = {
        user: (a, b) => {
            const getFullUserName = ({ user }: IOrderWithUser) => user.first_name + ' ' + user.last_name;
            return compareStrings(getFullUserName(a), getFullUserName(b));
        },
        date: (a, b) => {
            return compareNumbers(+a.created_at, +b.created_at);
        },
        amount: (a, b) => {
            return compareNumbers(+a.total, +b.total);
        },
        location: (a, b) => {
            const getCompareValue = ({ order_country, order_ip }: IOrder) => order_country + ' ' + order_ip;
            return compareStrings(getCompareValue(a), getCompareValue(b));
        }
    };
    const sortingFn = sortingFunctions[sortingType];
    return sortingType in sortingFunctions ? orders.sort(sortingFn) : orders;
}

export default function OrdersList() {
    const { orders, users } = useGlobalContext();
    const [sortingType, setSortingType] = useState<string>('');
    const [sortingOrder, setSortingOrder] = useState<boolean>(false);

    const usersById: { [key in string]: IUser } = users.reduce(
        (acc, user) => ({ ...acc, [user.id.toString()]: user }),
        {}
    );
    const ordersWithUsers: IOrderWithUser[] = orders.map(order => ({
        ...order,
        user: usersById[order.user_id.toString()]
    }));

    return (
        <table className="table table-hover">
            <OrdersListHeader
                sortingType={sortingType}
                setSortingType={setSortingType}
                sortingOrder={sortingOrder}
                setSortingOrder={setSortingOrder}
            />
            <tbody>
                {sortOrders(ordersWithUsers, sortingType, sortingOrder).map(order => (
                    <Order key={order.id} data={order} />
                ))}
            </tbody>
        </table>
    );
}
