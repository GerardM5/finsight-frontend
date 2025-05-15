import {useEffect} from "react";
import type {Transaction} from "../types/transaction.ts";
import {TransactionTableRow} from "./TransactionTableRow.tsx";

type Props = {
    transactions: Transaction[];
    onReloadData: () => void;
}

export const TransactionsTable = ({ transactions, onReloadData }:Props) => {

    useEffect(() => {
        onReloadData();
    }, []);

    return (
        <table className="">
            <thead className="bg-gray-200 sticky top-0">
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
                return <TransactionTableRow key={t.id} transaction={t}/>
            })}
            </tbody>
        </table>
    )
}