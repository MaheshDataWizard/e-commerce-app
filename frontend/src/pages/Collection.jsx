import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (event) => {
    const value = event.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (event) => {
    const value = event.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(filtered);
  };

  const sortProduct = () => {
    let sorted = [...filterProducts];
    if (sortType === "low-high") sorted.sort((a, b) => a.price - b.price);
    else if (sortType === "high-low") sorted.sort((a, b) => b.price - a.price);
    setFilterProducts(sorted);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t px-4 sm:px-8">
      {/* Filter Sidebar */}
      <div className="sm:min-w-[200px]">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 select-none"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-4 sm:hidden transition-transform duration-200 ${
              showFilter ? "rotate-90" : ""
            }`}
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 p-4 mt-4 rounded-md ${
            showFilter ? "block" : "hidden sm:block"
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700 font-light">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-black"
                  value={cat}
                  onChange={toggleCategory}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Sub Category Filter */}
        <div
          className={`border border-gray-300 p-4 mt-4 rounded-md ${
            showFilter ? "block" : "hidden sm:block"
          }`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700 font-light">
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <label key={sub} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-black"
                  value={sub}
                  onChange={toggleSubCategory}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <Title text1="ALL" text2="COLLECTION" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm mt-2 sm:mt-0"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full py-10">
              No products found 😕
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
