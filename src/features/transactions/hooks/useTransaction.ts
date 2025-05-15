import {useState} from "react";
import type {Transaction} from "../types/transaction.ts";
import api from "../../../api/axios.ts";
import {transactionsAdapter} from "../adapter/transactions.ts";

export const useTransaction = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchTransactions = async () => {
        transactionsAdapter.get().then(setTransactions)
    };

    const handleCreateTransaction = async (data: FormData) => {
        try {
            await api.post("/transactions", data);
            fetchTransactions();
        } catch (err) {
            console.error("Error saving transaction", err);
        }
    };

    return {transactions, fetchTransactions, handleCreateTransaction};
}