import type {Transaction} from "../types/transaction.ts";
import {useTransaction} from "../hooks/useTransaction.ts";
import {useState} from "react";

type Props = { transaction: Transaction };


export const TransactionTableRow = ({transaction}: Props) => {

    const {deleteById} = useTransaction();
    const [isEditing, setIsEditing] = useState(false);

    const handleDeleteTransaction = async () => {
        await deleteById(transaction.id);
    }

    const startEditing = () => {
        setIsEditing(true);
    }
    return (
        <tr key={transaction.id} className="border-t hover:bg-gray-50">
            <td className="p-2">{isEditing ? <input type="date" defaultValue={transaction.date}/> :
                <p>{transaction.date}</p>}</td>
            <td className="p-2">{transaction.description}</td>
            <td className="p-2">{transaction.category}</td>
            <td className="p-2">{transaction.amount.toFixed(2)}</td>
            <td className="p-2">{transaction.type}</td>
            <td className="p-2 space-x-2">
                <button
                    onClick={isEditing ? () => console.log(transaction) : startEditing}
                    className="text-blue-600 hover:underline"
                >
                    {isEditing?"Save":"Edit"}
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
}