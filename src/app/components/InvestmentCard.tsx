import { Investment, InvestmentData } from "@/app/(pages)/investments/page";
import { formatCurrencyByCurrency } from "@/app/utils/formatCurrency";

const InvestmentCard = ({
  investments,
  data,
  isCrypto,
}: {
  investments: Investment[];
  data: InvestmentData;
  isCrypto: boolean;
}) => {
  if (isCrypto) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          {data.symbol}
        </h3>
        <div className="text-center">
          <span className="font-semibold text-gray-600">Preço Atual:</span>
          <span className="text-lg text-blue-600 block">
            {formatCurrencyByCurrency(data.price, data.currency)}
          </span>
        </div>
      </div>
    );
  }

  const investment = investments.find((inv) => inv.symbol === data.symbol);
  const purchasePriceTotal =
    parseFloat(investment?.purchasePrice.toString() ?? "0") *
    parseInt(investment?.amount.toString() ?? "1");
  const averagePurchasePriceTotal =
    purchasePriceTotal / parseInt(investment?.amount.toString() ?? "1");
  const currentPriceTotal =
    parseFloat(data.price.toString()) * (investment?.amount ?? 1);
  const profit = currentPriceTotal - purchasePriceTotal;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-2xl font-semibold text-center text-blue-600 mb-4">
        {data.symbol}
      </h3>
      <div className="flex flex-col space-y-4">
        {[
          { label: "Preço Atual", value: parseFloat(data.price.toString()) },
          { label: "Quantidade", value: investment?.amount },
          { label: "Preço Médio de Compra", value: averagePurchasePriceTotal },
          {
            label: "Preço de Abertura",
            value: parseFloat(data.openPrice?.toString() ?? "0"),
          },
          {
            label: "Preço máximo do dia",
            value: parseFloat(data.highPrice?.toString() ?? "0"),
          },
          {
            label: "Preço mínimo do dia",
            value: parseFloat(data.lowPrice?.toString() ?? "0"),
          },
        ].map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">{item.label}:</span>
            <span className="text-lg text-blue-600">
              {formatCurrencyByCurrency(item.value, data.currency)}
            </span>
          </div>
        ))}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600">Lucro/Prejuízo:</span>
          <span
            className={`text-lg ${
              profit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrencyByCurrency(profit, data.currency)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
