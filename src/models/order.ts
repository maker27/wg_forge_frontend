export interface IOrder {
    id: number;
    transaction_id: string;
    created_at: string;
    user_id: number;
    total: string;
    card_type: string;
    card_number: string;
    order_country: string;
    order_ip: string;
}
