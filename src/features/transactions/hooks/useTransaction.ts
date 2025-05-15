import {useState} from "react";
import type {Transaction} from "../types/transaction.ts";
import {transactionsAdapter} from "../adapter/transactions.ts";
import type {FormData} from "../types/formData.ts";

export const useTransaction = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const getAll = async () => {
        transactionsAdapter.getAll().then(setTransactions).catch((err => {
            console.error("Error loading transactions", err);
        }));
    };

    const create = async (data: FormData) => {
        transactionsAdapter.create(data).then(getAll);
    };

    const deleteById = async (id: number) => {
        transactionsAdapter.delete(id).then(getAll);
    };

    const get = async (id: number) => {
        await transactionsAdapter.get(id);
    };

    const update = async (id: number, data: FormData) => {
        transactionsAdapter.update(id, data).then(getAll);
    };

    return {transactions, getAll, create, update, get, deleteById};
}