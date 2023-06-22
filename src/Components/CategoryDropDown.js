import React, { useState } from "react";

const CategoryDropdown = ({ categories, onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <select
      value={selectedCategory}
      onChange={handleCategoryChange}
      className="py-2 px-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent  "
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryDropdown;
