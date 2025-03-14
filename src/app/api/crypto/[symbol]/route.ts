import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const symbol = url.pathname.split("/").pop();

  if (!symbol) {
    return new NextResponse(
      JSON.stringify({ error: 'Parâmetro "symbol" é obrigatório.' }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=brl,usd`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data[symbol]) {
      return new NextResponse(
        JSON.stringify({
          error: `Nenhum dado encontrado para a criptomoeda "${symbol}".`,
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { brl, usd } = data[symbol] || {};

    if (brl === undefined && usd === undefined) {
      return new NextResponse(
        JSON.stringify({
          error: `Nenhum dado encontrado para a criptomoeda "${symbol}" nas moedas USD ou BRL.`,
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let currency = "BRL";
    let price = brl;

    if (brl === undefined && usd !== undefined) {
      currency = "USD";
      price = usd;
    }

    return new NextResponse(
      JSON.stringify({
        symbol: symbol.toUpperCase(),
        price: price,
        currency: currency,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro ao buscar dados da CoinGecko:", error);
    return new NextResponse(
      JSON.stringify({ error: "Erro ao buscar dados da criptomoeda." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
