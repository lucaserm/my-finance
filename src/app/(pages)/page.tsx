"use client";
import { formatCurrencyByCurrency } from "@/app/utils/formatCurrency";
import { useCallback, useState } from "react";

interface Stock {
  symbol: string;
  price: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  currency: string;
}

export default function Home() {
  const listCurrencies = ["BRL", "USD"];
  const [stockSymbol, setStockSymbol] = useState("");
  const [currency, setCurrency] = useState(listCurrencies[0]);
  const [stockData, setStockData] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(false);

  // Função para fazer a requisição à API
  const fetchStock = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/stocks/${stockSymbol}/${currency}`);
      const data = await response.json();

      if (data.error) {
        alert(data.error); // Se houver erro, exibe mensagem
        setStockData(null); // Limpa os dados da ação em caso de erro
      } else {
        setStockData(data);
      }
    } catch (e) {
      // Estado de carregamento

      console.log(e);
      alert("Erro ao buscar dados da ação. Tente novamente.");
      setStockData(null); // Limpa os dados da ação em caso de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  }, [stockSymbol, currency]); // Certificando-se de que o símbolo e a moeda são dependências

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStock(); // Faz a requisição para pegar os dados da ação
  };

  return (
    <div className="max-w-3xl mx-auto mt-5 p-6 bg-white rounded-lg shadow-lg">
      {/* Formulário de busca */}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value.toUpperCase())} // Atualiza o símbolo
            placeholder="Digite o símbolo da ação"
            className="w-64 p-3 text-lg border-2 border-gray-300 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="p-3 text-lg border-2 border-gray-300 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {listCurrencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Buscar Dados
          </button>
        </div>
      </form>

      {/* Indicador de Loading */}
      {loading && (
        <div className="flex justify-center mb-6">
          <div
            className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-blue-500 border-gray-200"
            role="status"
          >
            <span className="visually-hidden"></span>
          </div>
        </div>
      )}

      {/* Dados da ação */}
      {stockData && !loading && (
        <div>
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            {stockData.symbol}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="font-semibold text-blue-600">Preço Atual:</div>
              <div>
                {formatCurrencyByCurrency(
                  parseFloat(stockData.price.toString()),
                  stockData.currency
                )}
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="font-semibold text-blue-600">
                Preço de Abertura:
              </div>
              <div>
                {formatCurrencyByCurrency(
                  parseFloat(stockData.openPrice.toString()),
                  stockData.currency
                )}
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="font-semibold text-blue-600">
                Preço Máximo do Dia:
              </div>
              <div>
                {formatCurrencyByCurrency(
                  parseFloat(stockData.highPrice.toString()),
                  stockData.currency
                )}
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="font-semibold text-blue-600">
                Preço Mínimo do Dia:
              </div>
              <div>
                {formatCurrencyByCurrency(
                  parseFloat(stockData.lowPrice.toString()),
                  stockData.currency
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
