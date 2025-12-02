import { useState, useEffect } from "react";

const FilterBar = ({ products = [], setFiltered }) => {
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");

  useEffect(() => {
    if (products.length) {
      setCategories([...new Set(products.map((p) => p.category))]);
      setMaterials([...new Set(products.map((p) => p.material))]);
    }
  }, [products]);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory)
      filtered = filtered.filter((p) => p.category === selectedCategory);

    if (selectedMaterial)
      filtered = filtered.filter((p) => p.material === selectedMaterial);

    setFiltered(filtered);
  }, [selectedCategory, selectedMaterial, products, setFiltered]);

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-6">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-2 border rounded-md bg-white shadow"
      >
        <option value="">All Categories</option>
        {categories.map((category, idx) => (
          <option key={idx} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={selectedMaterial}
        onChange={(e) => setSelectedMaterial(e.target.value)}
        className="px-4 py-2 border rounded-md bg-white shadow"
      >
        <option value="">All Materials</option>
        {materials.map((material, idx) => (
          <option key={idx} value={material}>
            {material}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
