import {CreateTransactionForm} from "../components/CreateTransactionForm.tsx";
import {TransactionsTable} from "../components/TransactionsTable.tsx";
import {useTransaction} from "../hooks/useTransaction.ts";


export default function TransactionsPage() {

    const {transactions, fetchTransactions} = useTransaction();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>
            <CreateTransactionForm onSubmit={fetchTransactions}/>
            <TransactionsTable transactions={transactions} onReloadData={fetchTransactions}/>
        </div>
    );
}