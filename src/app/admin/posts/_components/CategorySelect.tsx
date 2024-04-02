import React, { useEffect, useState } from "react";
import { Category } from "../../../../types/Category";

interface Props {
  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
}

export const CategoriesSelect: React.FC<Props> = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/admin/categories");
      const data = await response.json();
      setCategories(data.categories);
    };

    fetchCategories();
  }, []);

  const handleSelectCategory = (category: Category) => {
    if (selectedCategories.some((c) => c.id === category.id)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c.id !== category.id)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleSelectCategory(category)}
          type="button"
          className={`px-4 py-2 rounded-full text-white ${
            selectedCategories.some((c) => c.id === category.id)
              ? "bg-blue-500"
              : "bg-gray-500"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
