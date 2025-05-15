import api from "../../../api/axios.ts";
import {useEffect} from "react";
import type {Transaction} from "../types/transaction.ts";

type Props = {
    transactions: Transaction[];
    onReloadData: () => void;
}

export const TransactionsTable = ({ transactions, onReloadData }:Props) => {

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/transactions/${id}`);
            onReloadData();
        } catch (err) {
            console.error("Error deleting transaction", err);
        }
    };

//    const handleEdit = (transaction: Transaction) => {
//        setEditingId(transaction.id);
//        reset(transaction);
//    };

    useEffect(() => {
        onReloadData();
    }, []);

    return (
        <table className="w-full text-left bg-white shadow rounded">
            <thead className="bg-gray-200">
            <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Description</th>
                <th className="p-2">Category</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Type</th>
                <th className="p-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((t) => {
                const handleDeleteTransaction = () => {
                    handleDelete(t.id);
                }
                return(
                    <tr key={t.id} className="border-t hover:bg-gray-50">
                        <td className="p-2">{t.date}</td>
                        <td className="p-2">{t.description}</td>
                        <td className="p-2">{t.category}</td>
                        <td className="p-2">{t.amount.toFixed(2)}</td>
                        <td className="p-2">{t.type}</td>
                        <td className="p-2 space-x-2">
                            <button
                                onClick={() => console.log("Edit", t)}
                                className="text-blue-600 hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDeleteTransaction}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}