import React from 'react';
import { IOrder } from '../models';
import { useGlobalContext } from '../context';
import { showCardNumber, showDate } from '../utils';
import UserView from './UserView';

export default function Order({
    data: { id, user_id, transaction_id, created_at, total, card_number, card_type, order_country, order_ip }
}: {
    data: IOrder;
}) {
    const { users } = useGlobalContext();
    const user = users.find(({ id }) => id === user_id);
    return (
        <tr id={'order_' + id}>
            <th scope="row">{transaction_id}</th>
            <td className="user_data">{user ? <UserView user={user} /> : <s>Unknown User</s>}</td>
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
