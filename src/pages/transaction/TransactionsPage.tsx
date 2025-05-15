import {CreateTransactionForm} from "../../features/transactions/components/CreateTransactionForm.tsx";
import {TransactionsTable} from "../../features/transactions/components/TransactionsTable.tsx";
import {useTransaction} from "../../features/transactions/hooks/useTransaction.ts";


export default function TransactionsPage() {

    const {transactions, getAll} = useTransaction();

    return (
        <div className="flex-col flex gap-4 ">
            <h1 className="text-2xl text-center font-bold py-4">Transactions</h1>
            <CreateTransactionForm onSubmit={getAll}/>
            <TransactionsTable transactions={transactions} onReloadData={getAll}/>
        </div>
    );
}