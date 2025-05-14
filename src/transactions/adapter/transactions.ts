import api from "../../api/axios.ts";
import type {Transaction} from "../types/transaction.ts";

const mapTransaction = (t: Transaction): Transaction => ({
    id: t.id,
    amount: t.amount,
    category: t.category,
    date: t.date,
    description: t.description,
    type: t.type,
});

const mapTransactions = (transactions: Transaction[]): Transaction[] => {
    return transactions.map(mapTransaction);
}

export const transactionsAdapter = {
    get: async ():Promise<Transaction[]> => {
        try {
            const res = await api.get("/transactions");
            const transactions:Transaction[] = mapTransactions(res.data);
            return transactions;
        } catch (err) {
            console.error("Error loading transactions", err);
            throw err;
        }
    }
}