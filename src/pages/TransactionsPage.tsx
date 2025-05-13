import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import api from "../api/axios";

type Transaction = {
    id: number;
    amount: number;
    category: string;
    date: string;
    description: string;
    type: "INCOME" | "EXPENSE";
};

type FormData = {
    amount: number;
    category: string;
    date: string;
    description: string;
    type: "INCOME" | "EXPENSE";
};

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    const {register, handleSubmit, reset} = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            if (editingId !== null) {
                await api.put(`/transactions/${editingId}`, data);
                setEditingId(null);
            } else {
                await api.post("/transactions", data);
            }
            fetchTransactions();
            reset();
        } catch (err) {
            console.error("Error saving transaction", err);
        }
    };

    const fetchTransactions = async () => {
        try {
            const res = await api.get("/transactions");
            setTransactions(res.data);
        } catch (err) {
            console.error("Error loading transactions", err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/transactions/${id}`);
            fetchTransactions(); // actualiza el listado
        } catch (err) {
            console.error("Error deleting transaction", err);
        }
    };

    const handleEdit = (transaction: Transaction) => {
        setEditingId(transaction.id);
        reset(transaction);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-4 mb-6 rounded shadow space-y-3"
            >
                <div className="flex gap-3 flex-wrap">
                    <input
                        type="text"
                        placeholder="Description"
                        {...register("description", {required: true})}
                        className="flex-1 p-2 border rounded"
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Amount"
                        {...register("amount", {required: true})}
                        className="w-32 p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        {...register("category", {required: true})}
                        className="w-32 p-2 border rounded"
                    />
                    <input
                        type="date"
                        {...register("date", {required: true})}
                        className="w-40 p-2 border rounded"
                    />
                    <select {...register("type")} className="p-2 border rounded">
                        <option value="INCOME">Income</option>
                        <option value="EXPENSE">Expense</option>
                    </select>
                    <div className="flex items-center gap-2">
                        <button
                            type="submit"
                            className={`px-4 rounded text-white ${editingId !== null ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}`}
                        >
                            {editingId !== null ? "Update" : "Add"}
                        </button>
                        {editingId !== null && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    reset();
                                }}
                                className="text-sm text-gray-600 hover:underline"
                            >
                                Cancel edit
                            </button>
                        )}
                    </div>
                </div>
            </form>
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
                {transactions.map((t) => (
                    <tr key={t.id} className="border-t hover:bg-gray-50">
                        <td className="p-2">{t.date}</td>
                        <td className="p-2">{t.description}</td>
                        <td className="p-2">{t.category}</td>
                        <td className="p-2">{t.amount.toFixed(2)}</td>
                        <td className="p-2">{t.type}</td>
                        <td className="p-2 space-x-2">
                            <button
                                onClick={() => handleEdit(t)}
                                className="text-blue-600 hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(t.id)}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}