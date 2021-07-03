import React, { useState } from 'react';
import './OrdersList.scss';
import { useGlobalContext } from '../context';
import { IOrder, IOrderWithUser, IUser } from '../models';
import Order from './Order';
import OrdersListHeader from './OrdersListHeader';
import OrdersListFooter from './OrdersListFooter';
import { userFullName } from '../utils';

interface ISortingFunction {
    (a: IOrderWithUser, b: IOrderWithUser): number;
}

function sortOrders(orders: IOrderWithUser[], sortingType: string, sortingOrder: boolean): IOrderWithUser[] {
    const compareStrings = (a: string, b: string) => (sortingOrder ? -1 : 1) * (a < b ? -1 : a > b ? 1 : 0);
    const compareNumbers = (a: number, b: number) => (sortingOrder ? -1 : 1) * (a - b);
    const sortingFunctions: { [key in string]: ISortingFunction } = {
        user: (a, b) => {
            return compareStrings(userFullName(a.user), userFullName(b.user));
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

function filterOrders(orders: IOrderWithUser[], filter: string): IOrderWithUser[] {
    if (filter) {
        return orders.filter(({ transaction_id, total, card_type, order_country, order_ip, user }) => {
            return (
                transaction_id.includes(filter) ||
                total.includes(filter) ||
                card_type.includes(filter) ||
                order_country.includes(filter) ||
                order_ip.includes(filter) ||
                userFullName(user).includes(filter)
            );
        });
    }
    return orders;
}

export default function OrdersList() {
    const { orders, users } = useGlobalContext();
    const [sortingType, setSortingType] = useState<string>('');
    const [sortingOrder, setSortingOrder] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');

    const usersById: { [key in string]: IUser } = users.reduce(
        (acc, user) => ({ ...acc, [user.id.toString()]: user }),
        {}
    );
    const ordersWithUsers: IOrderWithUser[] = orders.map(order => ({
        ...order,
        user: usersById[order.user_id.toString()]
    }));

    const filteredOrders = sortOrders(filterOrders(ordersWithUsers, filter), sortingType, sortingOrder);

    return (
        <table className="table table-hover">
            <OrdersListHeader
                sortingType={sortingType}
                setSortingType={setSortingType}
                sortingOrder={sortingOrder}
                setSortingOrder={setSortingOrder}
                setFilter={setFilter}
            />
            <tbody>
                {filteredOrders.length ? (
                    filteredOrders.map(order => <Order key={order.id} data={order} />)
                ) : (
                    <tr>
                        <td colSpan={7}>Nothing found</td>
                    </tr>
                )}
            </tbody>
            <OrdersListFooter orders={filteredOrders} />
        </table>
    );
}
