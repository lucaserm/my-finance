export const formatDate = (
  date: string | Date,
  config: Intl.DateTimeFormatOptions & {
    locale: "pt-BR";
    format: "intl" | "iso";
  }
): string => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  if (config?.format === "iso") {
    return date.toISOString().split("T")[0];
  }

  return date.toLocaleString("pt-BR", {
    timeZone: "UTC",
    ...config,
  });
};
