import { formatCurrency } from "@/app/utils/formatCurrency";

export default function TransactionList({ transactions, removeTransaction }) {
  return (
    <ul className="border border-gray-200 rounded p-4">
      {transactions.map((transaction) => (
        <li key={transaction.id} className="flex justify-between mb-2">
          <span>
            {transaction.description}: {formatCurrency(transaction.amount)}
          </span>
          <button
            className="text-red-500"
            onClick={() => removeTransaction(transaction.id)}
          >
            Remover
          </button>
        </li>
      ))}
    </ul>
  );
}
