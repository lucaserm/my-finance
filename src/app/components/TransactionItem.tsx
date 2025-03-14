export interface Transaction {
  id: string;
  amount: number;
  description: string;
  isIncome: boolean;
  categoryId: string;
  date: string;
}

interface Props {
  transaction: Transaction;
  getCategoryName: (categoryId: string, isIncome: boolean) => string;
  removeTransaction: (transactionId: string) => void;
}

export default function TransactionItem({
  transaction,
  getCategoryName,
  removeTransaction,
}: Props) {
  return (
    <li
      className={`flex items-center gap-6 mb-4 ${
        transaction.isIncome ? "text-green-500" : "text-red-500"
      }`}
    >
      <div className="flex flex-col">
        <span>
          <strong>{transaction.description}</strong>{" "}
          {transaction.categoryId
            ? `(${getCategoryName(
                transaction.categoryId,
                transaction.isIncome
              )})`
            : ""}
          :{transaction.amount}
        </span>
        <span className="text-gray-500 text-sm">Data: {transaction.date}</span>
      </div>
      <button
        onClick={() => removeTransaction(transaction.id)}
        className="text-red-500"
        aria-label={`Remover transação: ${transaction.description}`}
      >
        Remover
      </button>
    </li>
  );
}
