
export enum TransactionTypes {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
}

export type TransactionType = keyof typeof TransactionTypes;

export type Transaction = {
    id: number;
    amount: number;
    category: string;
    date: string;
    description: string;
    type: TransactionType;
};