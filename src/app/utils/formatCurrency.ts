export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatCurrencyByCurrency(
  value: number | undefined,
  currency: string,
  locale: string = "pt-BR"
): string {
  if (isNaN(value!)) {
    return "NaN";
  }
  return value!.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}
