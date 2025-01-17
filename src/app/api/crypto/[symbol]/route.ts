export async function GET(request: Request, context: { params: { symbol: string } }) {
  const {params} = context;
  const {symbol} = await params;

  if (!symbol) {
    return new Response(
      JSON.stringify({error: 'Parâmetro "symbol" é obrigatório.'}),
      {
        status: 400,
        headers: {'Content-Type': 'application/json'},
      }
    );
  }

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=brl,usd`;
    const response = await fetch(url);
    const data = await response.json();
    const {brl, usd} = data[symbol.toString()] || {};

    if (!brl && !usd) {
      return new Response(
        JSON.stringify({error: `Nenhum dado encontrado para a criptomoeda "${symbol}".`}),
        {
          status: 404,
          headers: {'Content-Type': 'application/json'},
        }
      );
    }

    return new Response(
      JSON.stringify({
        symbol: symbol.toUpperCase(),
        price: brl,
        currency: "BRL",
      }),
      {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }
    );
  } catch (error) {
    console.error('Erro ao buscar dados da CoinGecko:', error);
    return new Response(
      JSON.stringify({error: 'Erro ao buscar dados da criptomoeda.'}),
      {
        status: 500,
        headers: {'Content-Type': 'application/json'},
      }
    );
  }
}
