interface Category {
  id: string;
  name: string;
}

export function getCategoryName(
  id: string,
  isIncome: boolean,
  incomeCategories: Category[],
  expenseCategories: Category[]
): string {
  const categories = isIncome ? incomeCategories : expenseCategories;
  const category = categories.find((cat) => cat.id === id);
  return category ? category.name : "";
}