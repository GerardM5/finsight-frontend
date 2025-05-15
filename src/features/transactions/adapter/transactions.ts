import api from "../../../api/axios.ts";
import type {Transaction} from "../types/transaction.ts";
import type {FormData} from "../types/formData.ts";

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
    getAll: async ():Promise<Transaction[]> => {
        try {
            const res = await api.get("/transactions");
            const transactions:Transaction[] = mapTransactions(res.data);
            return transactions;
        } catch (err) {
            console.error("Error loading transactions", err);
            throw err;
        }
    },

    create: async (data: FormData) => {
        try {
            await api.post("/transactions", data);
        } catch (err) {
            console.error("Error saving transaction", err);
            throw err;
        }
    },

    delete: async (id: number) => {
        try {
            await api.delete(`/transactions/${id}`);
        } catch (err) {
            console.error("Error deleting transaction", err);
            throw err;
        }
    },

    update: async (id: number, data: FormData) => {
        try {
            await api.put(`/transactions/${id}`, data);
        } catch (err) {
            console.error("Error updating transaction", err);
            throw err;
        }
    },

    get: async (id: number) => {
        try {
            const res = await api.get(`/transactions/${id}`);
            return mapTransaction(res.data);
        } catch (err) {
            console.error("Error loading transaction", err);
            throw err;
        }
    }
}