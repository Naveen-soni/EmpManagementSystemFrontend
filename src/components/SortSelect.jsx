// src/components/SortSelect.jsx
const SortSelect = ({ onSort, selected }) => {
  return (
    <select
      onChange={(e) => onSort(e.target.value)}
      value={selected}
      className="px-4 py-2 border rounded-md w-full md:w-auto"
    >
      <option value="">Sort By</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  );
};

export default SortSelect;
