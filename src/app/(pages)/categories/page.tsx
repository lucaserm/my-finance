"use client";
import { useState } from "react";
import CategoryForm from "@/app/components/CategoryForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CategoriesPage() {
  const [incomeCategories, setIncomeCategories] = useState([
    { id: "1", name: "Salário" },
    { id: "2", name: "VR" },
  ]);

  const [expenseCategories, setExpenseCategories] = useState([
    { id: "1", name: "Alimentação" },
    { id: "2", name: "Transporte" },
  ]);

  const addCategory = (newCategory) => {
    if (newCategory.isIncome) {
      setIncomeCategories([...incomeCategories, { ...newCategory, id: (incomeCategories.length + 1).toString() }]);
    } else {
      setExpenseCategories([...expenseCategories, { ...newCategory, id: (expenseCategories.length + 1).toString() }]);
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
