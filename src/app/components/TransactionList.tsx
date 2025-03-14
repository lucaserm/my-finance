import { Transaction } from "@/app/components/TransactionItem";
import { formatCurrency } from "@/app/utils/formatCurrency";

interface Props {
  transactions: Transaction[];
  removeTransaction: (id: string) => void;
}

export default function TransactionList({
  transactions,
  removeTransaction,
}: Props) {
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
