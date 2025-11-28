export function formatCurrency(
  value: number,
  config: Intl.NumberFormatOptions & {
    locale: string;
  }
): string {
  return value.toLocaleString(config.locale, {
    style: "currency",
    ...config,
  });
}
