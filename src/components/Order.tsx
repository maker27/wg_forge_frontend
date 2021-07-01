import React from 'react';
import { IOrder } from '../models/order';
import { IUser } from '../models/user';

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

function UserView({ userId, users }: { userId: number; users: IUser[] }) {
    const user: IUser | undefined = users.find(({ id }) => id === userId);
    return user ? (
        <a href="#">
            {user.gender === 'Male' ? 'Mr' : 'Ms'}. {user.first_name} {user.last_name}
        </a>
    ) : (
        <s>Unknown User</s>
    );
}

export default function Order({
    data: { id, transaction_id, user_id, created_at, total, card_number, card_type, order_country, order_ip },
    users
}: {
    data: IOrder;
    users: IUser[];
}) {
    return (
        <tr id={'order_' + id}>
            <th scope="row">{transaction_id}</th>
            <td className="user_data">
                <UserView userId={user_id} users={users} />
            </td>
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
