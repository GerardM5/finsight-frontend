import {useForm} from "react-hook-form";
import api from "../../../api/axios.ts";
import type {FormData} from "../types/formData.ts";
import {useState} from "react";

interface Props {
    onSubmit: () => void;
}

export const CreateTransactionForm = ({onSubmit }:Props) => {

    const {register, handleSubmit, reset} = useForm<FormData>();
    const [editingId, setEditingId] = useState<number | null>(null);


    const onFormSubmit = async (data: FormData) => {
        try {
            await api.post("/transactions", data);
            reset();
            onSubmit();
        } catch (err) {
            console.error("Error saving transaction", err);
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
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
    )
}