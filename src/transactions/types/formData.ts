import type {TransactionType} from "./transaction.ts";


export type FormData = {
    amount: number;
    category: string;
    date: string;
    description: string;
    type: TransactionType;
};