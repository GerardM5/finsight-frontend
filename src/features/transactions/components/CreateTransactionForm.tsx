import type {FormData} from "../types/formData.ts";
import {type FormEvent, useState} from "react";
import {useTransaction} from "../hooks/useTransaction.ts";
import type {TransactionType} from "../types/transaction.ts";

interface Props {
    onSubmit: () => void;
}

export const CreateTransactionForm = ({onSubmit}: Props) => {

    const [editingId, setEditingId] = useState<number | null>(null);
    const {create} = useTransaction();


    const onFormSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            const target = e.currentTarget as HTMLFormElement;
            const formData = new FormData(target);
            const data: FormData = {
                description: formData.get("description") as string,
                amount: parseFloat(formData.get("amount") as string),
                category: formData.get("category") as string,
                date: formData.get("date") as string,
                type: formData.get("transactionType") as TransactionType,
            };
            await create(data);
            onSubmit();
            target.reset();
        } catch (err) {
            console.error("Error submitting the form", err);
        }
    };

    return (
        <form
            onSubmit={onFormSubmit}
            className=""
        >
            <div className="flex gap-3 flex-wrap">
                <input
                    type="text"
                    placeholder="Description"
                    name = "description"
                    className="flex-1 p-2 border rounded"
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    name="amount"
                    className="w-32 p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Category"
                    name="category"
                    className="w-32 p-2 border rounded"
                />
                <input
                    type="date"
                    name="date"
                    className="w-40 p-2 border rounded"
                />
                <select name="transactionType" defaultValue="EXPENSE">
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
                            }}
                            className="text-sm text-gray-600 hover:underline"
                        >
                            Cancel edit
                        </button>
                    )}
                </div>
            </div>
        </form>
    )
}