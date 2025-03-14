"use client";
import CategoryForm from "@/app/components/CategoryForm";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Category {
  name: string;
  isIncome: boolean;
}

interface IIncomeCategories {
  id: string;
  name: string;
}

interface IExpenseCategories {
  id: string;
  name: string;
}

export default function CategoriesPage() {
  const [incomeCategories, setIncomeCategories] = useState<IIncomeCategories[]>(
    [
      { id: "1", name: "Salário" },
      { id: "2", name: "VR" },
    ]
  );

  const [expenseCategories, setExpenseCategories] = useState<
    IExpenseCategories[]
  >([
    { id: "1", name: "Alimentação" },
    { id: "2", name: "Transporte" },
  ]);

  const addCategory = (newCategory: Category) => {
    if (newCategory.isIncome) {
      setIncomeCategories([
        ...incomeCategories,
        { ...newCategory, id: (incomeCategories.length + 1).toString() },
      ]);
    } else {
      setExpenseCategories([
        ...expenseCategories,
        { ...newCategory, id: (expenseCategories.length + 1).toString() },
      ]);
    }
  };

  return (
    <div className="p-8">
      <ToastContainer />
      <h1 className="text-xl font-bold mb-4">Categorias</h1>
      <CategoryForm addCategory={addCategory} />
    </div>
  );
}
