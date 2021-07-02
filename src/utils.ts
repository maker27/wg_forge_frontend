export function showDate(timestamp: string, onlyDate: boolean = false): string {
    const date = new Date(+timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
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
