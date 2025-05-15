import {CreateTransactionForm} from "../../features/transactions/components/CreateTransactionForm.tsx";
import {TransactionsTable} from "../../features/transactions/components/TransactionsTable.tsx";
import {useTransaction} from "../../features/transactions/hooks/useTransaction.ts";


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