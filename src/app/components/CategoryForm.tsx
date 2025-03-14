import { Category } from "@/app/(pages)/categories/page";
import { useState } from "react";

export interface ICategoryForm {
  addCategory: (newCategory: Category) => void;
}

export default function CategoryForm({ addCategory }: ICategoryForm) {
  const [newCategory, setNewCategory] = useState({ name: "", isIncome: true });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCategory(newCategory);
    setNewCategory({ name: "", isIncome: true });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mt-4">
      <input
        type="text"
        value={newCategory.name}
        onChange={(e) =>
          setNewCategory({ ...newCategory, name: e.target.value })
        }
        placeholder="Nome da Categoria"
        className="border rounded p-2"
      />
      <label>
        <input
          type="checkbox"
          checked={newCategory.isIncome}
          onChange={(e) =>
            setNewCategory({ ...newCategory, isIncome: e.target.checked })
          }
        />
        Entrada
      </label>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Adicionar
      </button>
    </form>
  );
}
