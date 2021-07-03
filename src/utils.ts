import { IOrderWithUser } from './models/order';

export function showDate(timestamp: string, onlyDate: boolean = false): string {
    const date = new Date(+timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const doubleDigit = (num: number): string => ('0' + num).slice(-2);
    let dateText = `${doubleDigit(day)}/${doubleDigit(month)}/${year}`;
    if (!onlyDate) dateText += ` ${doubleDigit(hour)}:${doubleDigit(minute)}:${doubleDigit(second)}`;
    return dateText;
}

export function showCardNumber(cardNumber: string): string {
    const numberSize = cardNumber.length;
    return cardNumber.slice(0, 2) + '*'.repeat(numberSize - 6) + cardNumber.slice(-4);
}

export function calcMedian(arr: number[]): number {
    const length = arr.length;
    const minMiddle = Math.floor(length / 2);
    const maxMiddle = Math.ceil(length / 2);
    const sortedArr = arr.sort((a, b) => a - b);
    return (sortedArr[minMiddle] + sortedArr[maxMiddle]) / 2;
}

export function calcAverage(orders: IOrderWithUser[]): { count: number; total: number; average: string } {
    const calcTotal = (orders: IOrderWithUser[]): number => {
        return orders.reduce((sum, { total }) => sum + +total * 100, 0) / 100;
    };

    const count = orders.length;
    const total = calcTotal(orders);
    const average = (total / count).toFixed(2);
    return { count, total, average };
}
