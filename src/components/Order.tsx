import React from 'react';
import { IOrder } from '../models/order';

function showDate(timestamp: string): string {
    const date = new Date(+timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const doubleDigit = (num: number): string => ('0' + num).slice(-2);
    return `${doubleDigit(day)}/${doubleDigit(month)}/${year} ${doubleDigit(hour)}:${doubleDigit(
        minute
    )}:${doubleDigit(second)}`;
}

function showCardNumber(cardNumber: string): string {
    const numberSize = cardNumber.length;
    return cardNumber.slice(0, 2) + '*'.repeat(numberSize - 6) + cardNumber.slice(-4);
}

export default function Order({
    data: { id, transaction_id, user_id, created_at, total, card_number, card_type, order_country, order_ip }
}: {
    data: IOrder;
}) {
    return (
        <tr id={'order_' + id}>
            <th scope="row">{transaction_id}</th>
            <td className="user_data">{user_id}</td>
            <td>{showDate(created_at)}</td>
            <td>${total}</td>
            <td>{showCardNumber(card_number)}</td>
            <td>{card_type}</td>
            <td>
                {order_country} ({order_ip})
            </td>
        </tr>
    );
}
