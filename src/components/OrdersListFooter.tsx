import React from 'react';
import { IOrderWithUser } from '../models/order';
import { calcAverage, calcMedian } from '../utils';

export default function OrdersListFooter({ orders }: { orders: IOrderWithUser[] }) {
    const { count: ordersCount, total: ordersTotal, average: averageCheck } = calcAverage(orders);
    const medianValue = calcMedian(orders.map(({ total }) => +total));
    const { average: averageFemaleCheck } = calcAverage(orders.filter(({ user }) => user.gender !== 'Male'));
    const { average: averageMaleCheck } = calcAverage(orders.filter(({ user }) => user.gender === 'Male'));
    return (
        <thead>
            {[
                ['Orders Count', ordersCount],
                ['Orders Total', '$ ' + ordersTotal],
                ['Median Value', '$ ' + medianValue],
                ['Average Check', '$ ' + averageCheck],
                ['Average Check (Female)', '$ ' + averageFemaleCheck],
                ['Average Check (Male)', '$ ' + averageMaleCheck]
            ].map(([label, value], i) => {
                return (
                    <tr key={i}>
                        <td colSpan={4}>{label}</td>
                        <td colSpan={3}>{value}</td>
                    </tr>
                );
            })}
        </thead>
    );
}
