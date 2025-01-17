import { useState } from "react";

export default function TransactionForm({ addTransaction }) {
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    description: "",
    isIncome: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(newTransaction);
    setNewTransaction({ amount: "", description: "", isIncome: true });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mt-4">
      <input
        type="text"
        value={newTransaction.description}
        onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
        placeholder="Descrição"
        className="border rounded p-2"
      />
      <input
        type="number"
        value={newTransaction.amount}
        onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
        placeholder="Valor"
        className="border rounded p-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Adicionar
      </button>
    </form>
  );
}
