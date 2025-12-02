import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import SortSelect from "../components/SortSelect";
import SearchBar from "../components/SearchBar";
import allProducts from "../data/products";

const Collection = () => {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(lowerQuery)
    );
    setFilteredProducts(filtered);
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden isolate">
      {/* Golden Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 opacity-20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-yellow-200 opacity-10 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-yellow-300/30 shadow-2xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-yellow-300 via-white to-yellow-400 text-transparent bg-clip-text mb-10 drop-shadow-lg">
          Explore Our Collection
        </h2>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        {/* Filters & Sorting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <FilterBar products={allProducts} setFiltered={setFilteredProducts} />
          <SortSelect products={filteredProducts} setSorted={setFilteredProducts} />
        </motion.div>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Collection;
