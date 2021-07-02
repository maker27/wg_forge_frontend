import React, { Dispatch, SetStateAction } from 'react';

const ArrowDown = () => <span className="text-warning"> &#8595;</span>;
const ArrowUp = () => <span className="text-warning"> &#8593;</span>;

export default function OrdersListHeader({
    sortingType,
    setSortingType,
    sortingOrder,
    setSortingOrder
}: {
    sortingType: string;
    setSortingType: Dispatch<SetStateAction<string>>;
    sortingOrder: boolean;
    setSortingOrder: Dispatch<SetStateAction<boolean>>;
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
