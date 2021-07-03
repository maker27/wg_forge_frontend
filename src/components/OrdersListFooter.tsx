import React from 'react';
import { IOrderWithUser } from '../models';
import { calcAverage, calcMedian } from '../utils';
import { MALE_GENDER } from '../assets/constants';

function getStatistics(orders: IOrderWithUser[]) {
    const fields = [
        'Orders Count',
        'Orders Total',
        'Median Value',
        'Average Check',
        'Average Check (Female)',
        'Average Check (Male)'
    ];
    if (orders.length === 0) {
        return fields.map(field => [field, 'n/a']);
    }
    const { count: ordersCount, total: ordersTotal, average: averageCheck } = calcAverage(orders);
    const medianValue = calcMedian(orders.map(({ total }) => +total));
    const { average: averageFemaleCheck } = calcAverage(
        orders.filter(({ user }) => user.gender !== MALE_GENDER)
    );
    const { average: averageMaleCheck } = calcAverage(
        orders.filter(({ user }) => user.gender === MALE_GENDER)
    );
    return [
        ordersCount,
        '$ ' + ordersTotal,
        '$ ' + medianValue,
        '$ ' + averageCheck,
        '$ ' + averageFemaleCheck,
        '$ ' + averageMaleCheck
    ].map((value, index) => [fields[index], value]);
}

export default function OrdersListFooter({ orders }: { orders: IOrderWithUser[] }) {
    const statisticsRows = getStatistics(orders);
    return (
        <thead>
            {statisticsRows.map(([label, value], i) => {
                return (
                    <tr key={i}>
                        <td> </td>
                        <td colSpan={2}>{label}</td>
                        <td colSpan={4}>{value}</td>
                    </tr>
                );
            })}
        </thead>
    );
}
