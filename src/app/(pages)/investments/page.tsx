"use client";
import {useCallback, useEffect, useState} from "react";
import InvestmentCard from "@/app/components/InvestmentCard";
import InvestmentForm from "@/app/components/InvestmentForm";

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState([
  //   {
  //     id: 4,
  //     symbol: "LEVE3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 26.62
  //   },
  //   {
  //     id: 5,
  //     symbol: "KLBN3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 18.45
  //   },
  //   {
  //     id: 6,
  //     symbol: "BBAS3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 50.32
  //   },
  //   {
  //     id: 7,
  //     symbol: "ITSA3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 10.25
  //   },
  //   {
  //     id: 8,
  //     symbol: "EGIE3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 39.40
  //   },
  //   {
  //     id: 9,
  //     symbol: "GRND3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 8.75
  //   },
  //   {
  //     id: 10,
  //     symbol: "FLRY3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 17.68
  //   },
  //   {
  //     id: 11,
  //     symbol: "BBSE3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 27.80
  //   },
  //   {
  //     id: 12,
  //     symbol: "PRIO3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 34.10
  //   },
  //   {
  //     id: 13,
  //     symbol: "TOTS3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 28.22
  //   },
  //   {
  //     id: 14,
  //     symbol: "WEGE3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 25.65
  //   },
  //   {
  //     id: 15,
  //     symbol: "EQTL3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 21.12
  //   },
  //   {
  //     id: 16,
  //     symbol: "VALE3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 75.50
  //   },
  //   {
  //     id: 17,
  //     symbol: "VIVA3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 5.90
  //   },
  //   {
  //     id: 18,
  //     symbol: "ABEV3",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 2,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 15.44
  //   },
  //   {
  //     id: 2,
  //     symbol: "MXRF11",
  //     amount: 2,
  //     currency: "BRL",
  //     categoryInvestmentId: 1,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 10.18
  //   },
  //   {
  //     id: 19,
  //     symbol: "KNRI11",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 1,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 120.75
  //   },
  //   {
  //     id: 20,
  //     symbol: "HGLG11",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 1,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 168.00
  //   },
  //   {
  //     id: 21,
  //     symbol: "VISC11",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 1,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 106.35
  //   },
  //   {
  //     id: 22,
  //     symbol: "XPLG11",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 1,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 115.45
  //   },
  //   {
  //     id: 23,
  //     symbol: "XPML11",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 1,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 105.78
  //   },
  //   {
  //     id: 24,
  //     symbol: "KNCR11",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 1,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 95.25
  //   },
  //   {
  //     id: 25,
  //     symbol: "VGHF11",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 1,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 101.50
  //   },
  //   {
  //     id: 26,
  //     symbol: "VINO11",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 1,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 120.25
  //   },
  //   {
  //     id: 27,
  //     symbol: "GARE11",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 1,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 134.90
  //   },
  //   {
  //     id: 28,
  //     symbol: "URPR11",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 1,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 142.35
  //   },
  //   {
  //     id: 29,
  //     symbol: "VGIA11",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 1,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 110.50
  //   },
  //   {
  //     id: 30,
  //     symbol: "KNCA11",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 1,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 123.45
  //   },
  //   {
  //     id: 31,
  //     symbol: "bitcoin",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 5,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 0
  //   },
  //   {
  //     id: 32,
  //     symbol: "ethereum",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 5,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 0
  //   },
  //   {
  //     id: 33,
  //     symbol: "binancecoin",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 5,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 0
  //   },
  //   {
  //     id: 34,
  //     symbol: "chainlink",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 5,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 0
  //   },
  //   {
  //     id: 35,
  //     symbol: "solana",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 5,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 0
  //   },
  //   {
  //     id: 36,
  //     symbol: "uniswap",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 5,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 0
  //   },
  //   {
  //     id: 37,
  //     symbol: "GOOGL",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 200.00
  //   },
  //   {
  //     id: 38,
  //     symbol: "DIS",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 95.00
  //   },
  //   {
  //     id: 1,
  //     symbol: "AAPL",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 150.00
  //   },
  //   {
  //     id: 39,
  //     symbol: "META",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 310.00
  //   },
  //   {
  //     id: 41,
  //     symbol: "NVDA",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 150.00
  //   },
  //   {
  //     id: 42,
  //     symbol: "TMO",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 600.00
  //   },
  //   {
  //     id: 43,
  //     symbol: "JPM",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 140.00
  //   },
  //   {
  //     id: 44,
  //     symbol: "JNJ",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 160.00
  //   },
  //   {
  //     id: 45,
  //     symbol: "AMZN",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 200.00
  //   },
  //   {
  //     id: 46,
  //     symbol: "MCD",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 280.00
  //   },
  //   {
  //     id: 47,
  //     symbol: "KO",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 60.00
  //   },
  //   {
  //     id: 48,
  //     symbol: "MA",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date("2025-01-03"),
  //     purchasePrice: 350.00
  //   },
  //   {
  //     id: 49,
  //     symbol: "COST",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date(),
  //     purchasePrice: 550.00
  //   },
  //   {
  //     id: 50,
  //     symbol: "NU",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date(),
  //     purchasePrice: 8.50
  //   },
  //   {
  //     id: 51,
  //     symbol: "INTR",
  //     amount: 1,
  //     currency: "USD",
  //     categoryInvestmentId: 3,
  //     purchaseDate: new Date(),
  //     purchasePrice: 15.00
  //   },
  //   {
  //     id: 52,
  //     symbol: "IVVB11",
  //     amount: 1,
  //     currency: "BRL",
  //     categoryInvestmentId: 6,
  //     purchaseDate: new Date(),
  //     purchasePrice: 404.21
  //   },
  ]);
  const [categoryInvestments, setCategoryInvestments] = useState([
    {id: 1, name: "Fundos Imobiliários"},
    {id: 2, name: "Ações"},
    {id: 3, name: "Stocks"},
    {id: 4, name: "Renda Fixa"},
    {id: 5, name: "Cripto"},
    {id: 6, name: "ETF Internacional"},
  ]);
  const [loading, setLoading] = useState(false);
  const [investmentData, setInvestmentData] = useState<any[]>([]);
  const [errors, setErrors] = useState([]);
  const [newInvestment, setNewInvestment] = useState({
    symbol: "",
    amount: 1,
    currency: "BRL",
    categoryInvestmentId: 2,
    purchaseDate: new Date(),
    purchasePrice: 1
  });
  const [totalInvestment, setTotalInvestment] = useState(0);
  const handleChange = (e: React.ChangeEvent) => {
    const {name, value} = e.target;
    setNewInvestment((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setInvestments((prev) => {
      // Verifica se já existe um investimento com o mesmo símbolo
      const index = prev.findIndex(
        (investment) => investment.symbol === newInvestment.symbol
      );

      if (index !== -1) {
        const updatedInvestments = [...prev];
        updatedInvestments[index] = {
          ...updatedInvestments[index],
          purchaseDate: newInvestment.purchaseDate,
          amount: updatedInvestments[index].amount + newInvestment.amount,
          purchasePrice: (updatedInvestments[index].purchasePrice + parseFloat(newInvestment.purchasePrice)) / 2,
        };
        return updatedInvestments;
      } else {
        return [...prev, { id: prev.length + 1, ...newInvestment }];
      }
    });

    setNewInvestment({
      symbol: "",
      amount: 1,
      currency: "BRL",
      categoryInvestmentId: 1,
      purchaseDate: new Date(),
      purchasePrice: 0,
    });
  };

  const fetchStock = useCallback(async (stock: string, currency: string) => {
    try {
      const response = await fetch(`/api/stocks/${stock}/${currency}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setInvestmentData((prevState) =>
        prevState.some((investment) => investment.symbol === data.symbol)
          ? prevState
          : [...prevState, {
            ...data,
            categoryInvestmentId: investments.find((i) => i.symbol === stock)?.categoryInvestmentId
          }]
      );
    } catch (e) {
      setErrors((prev) => [...prev, `Erro ao buscar dados da ação: ${stock}.`]);
    }
  }, [investments]);

  const fetchCrypto = useCallback(async (symbol: string) => {
    try {
      const response = await fetch(`/api/crypto/${symbol}`);
      const data = await response.json();

      setInvestmentData((prevState) =>
        prevState.some((investment) => investment.symbol === data.symbol)
          ? prevState
          : [...prevState, {...data, categoryInvestmentId: 5}]
      );
    } catch (e) {
      setErrors((prev) => [...prev, `Erro ao buscar dados da criptomoeda: ${symbol}.`]);
    }
  }, []);

  const totalInvestments = useCallback(async () => {
    try {
      const total = await investments.reduce(async (accPromise, investment) => {
        const acc = await accPromise;
        let purchasePrice = investment.purchasePrice;

        if (investment.currency === "USD") {
          try {
            const response = await fetch(`/api/stocks/USDBRL=X/USD`);
            const data = await response.json();
            purchasePrice *= data.price;
          } catch (e) {
            setErrors((prev) => [...prev, `Erro ao converter.`]);
          }
        }

        return acc + (purchasePrice * investment.amount);
      }, Promise.resolve(0));

      setTotalInvestment(total);
    } catch (error) {
      console.error("Erro ao calcular total de investimentos:", error);
      setTotalInvestment(0);
    }
  }, [investments]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const fetchPromises = investments.map((investment) =>
        investment.categoryInvestmentId === 5
          ? fetchCrypto(investment.symbol)
          : fetchStock(investment.symbol, investment.currency)
      );
      await Promise.all(fetchPromises);
      setLoading(false);
    };

    totalInvestments();
    fetchAllData();
  }, [investments, totalInvestments]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {loading && (
        <div className="text-center mb-6">
          <div
            className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-blue-500 border-gray-200"
            role="status"></div>
          <p className="mt-2 text-lg text-blue-500">Carregando dados...</p>
        </div>
      )}
      
      <div className="mb-8 p-4 bg-gray-100 rounded-md">
        <h1 className="text-2xl font-bold text-gray-700">Resumo Pessoal</h1>
        <p className="text-lg">Total Investido: R$ {totalInvestment.toFixed(2)}</p>
      </div>
      {/* Formulário de Adição de Investimento */}
      <InvestmentForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newInvestment={newInvestment}
        categoryInvestments={categoryInvestments}
      />

      {!loading && investmentData.length === 0 && (
        <p className="text-center text-xl text-gray-500">Sem dados de investimentos disponíveis.</p>
      )}

      {errors.length > 0 && (
        <div className="text-center text-red-500 mb-4">
          {errors.map((error, index) => (
            <p key={`${error}-${index}`}>{error}</p>
          ))}
        </div>
      )}

      {categoryInvestments.map((category) => {
        const investmentsInCategory = investmentData.filter(
          (data) => data.categoryInvestmentId === category.id
        );

        return (
          investmentsInCategory.length > 0 && (
            <div key={category.id} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
                {category.name} - {investmentsInCategory.length} - {investmentsInCategory.reduce((total, investment) => total + parseFloat(investment.price), 0).toFixed(2)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {investmentsInCategory.map((data) => {
                  const isCrypto = data.categoryInvestmentId === 5;
                  return <InvestmentCard
                    investments={investments}
                    data={data}
                    isCrypto={isCrypto}
                  />
                })}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}
