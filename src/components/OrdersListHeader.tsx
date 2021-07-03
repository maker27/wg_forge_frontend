import React, { Dispatch, SetStateAction } from 'react';
import { ARROW_DOWN_CHAR, ARROW_UP_CHAR } from '../assets/constants';

const ArrowDown = () => <span className="text-warning"> {ARROW_DOWN_CHAR}</span>;
const ArrowUp = () => <span className="text-warning"> {ARROW_UP_CHAR}</span>;

export default function OrdersListHeader({
    sortingType,
    setSortingType,
    sortingOrder,
    setSortingOrder,
    setFilter
}: {
    sortingType: string;
    setSortingType: Dispatch<SetStateAction<string>>;
    sortingOrder: boolean;
    setSortingOrder: Dispatch<SetStateAction<boolean>>;
    setFilter: Dispatch<SetStateAction<string>>;
}) {
    const columns: { title: string; sorting?: string }[] = [
        { title: 'Transaction ID' },
        { title: 'User Info', sorting: 'user' },
        { title: 'Order Date', sorting: 'date' },
        { title: 'Order Amount', sorting: 'amount' },
        { title: 'Card Number' },
        { title: 'Card Type' },
        { title: 'Location', sorting: 'location' }
    ];

    const changeSortingType = (sorting: string) => () => {
        if (sorting === sortingType) {
            setSortingOrder(currentSortingOrder => !currentSortingOrder);
        } else {
            setSortingType(sorting);
            setSortingOrder(false);
        }
    };

    return (
        <thead>
            <tr>
                <th>Search:</th>
                <th colSpan={6}>
                    <input type="text" id="search" onChange={({ target }) => setFilter(target.value)} />
                </th>
            </tr>
            <tr>
                {columns.map(({ title, sorting }, index) => (
                    <th
                        key={index}
                        scope="col"
                        className={sorting ? 'sorting-column' : ''}
                        onClick={sorting ? changeSortingType(sorting) : undefined}>
                        {title}
                        {sorting && sortingType === sorting ? (
                            sortingOrder ? (
                                <ArrowUp />
                            ) : (
                                <ArrowDown />
                            )
                        ) : null}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
