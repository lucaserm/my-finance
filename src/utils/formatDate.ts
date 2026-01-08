export const formatDate = (
  date: string | Date,
  config?: Intl.DateTimeFormatOptions & {
    locale?: "pt-BR";
    format?: "intl" | "iso";
  }
): string => {
  const locale = config?.locale ?? "pt-BR";
  const format = config?.format ?? "intl";

  if (typeof date === "string") {
    date = new Date(date);
  }

  if (format === "iso") {
    return date.toISOString().split("T")[0];
  }

  return date.toLocaleString(locale, {
    timeZone: "UTC",
    ...config,
  });
};
