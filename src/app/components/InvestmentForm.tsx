import React from "react";

interface Investment {
  symbol: string;
  amount: number;
  purchasePrice: number;
  currency: string;
  categoryInvestmentId: number;
  purchaseDate: Date;
}

interface CategoryInvestment {
  id: number;
  name: string;
}

interface InvestmentFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  newInvestment: Investment;
  categoryInvestments: CategoryInvestment[];
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({
                                                         handleSubmit,
                                                         handleChange,
                                                         newInvestment,
                                                         categoryInvestments,
                                                       }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
    >
      <h3 className="text-xl font-bold text-gray-700 mb-4">Adicionar Novo Investimento</h3>

      <div className="mb-4">
        <label className="block text-gray-600">Símbolo</label>
        <input
          type="text"
          name="symbol"
          value={newInvestment.symbol}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="purchaseDate" className="block text-gray-600">Data de Compra</label>
        <input
          type="date"
          name="purchaseDate"
          id="purchaseDate"
          value={newInvestment.purchaseDate?.toISOString().split("T")[0] || ""}
          onChange={(e) =>
            handleChange({
              target: { name: "purchaseDate", value: new Date(e.target.value) },
            } as unknown as React.ChangeEvent<HTMLInputElement>)
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">Quantidade</label>
        <input
          type="number"
          name="amount"
          value={newInvestment.amount}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
          min="1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">Preço de Compra</label>
        <input
          type="number"
          name="purchasePrice"
          value={newInvestment.purchasePrice}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
          step="0.01"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">Moeda</label>
        <select
          name="currency"
          value={newInvestment.currency}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        >
          <option value="BRL">BRL</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">Categoria</label>
        <select
          name="categoryInvestmentId"
          value={newInvestment.categoryInvestmentId}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        >
          {categoryInvestments.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="mt-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Adicionar Investimento
      </button>
    </form>
  );
};

export default InvestmentForm;
