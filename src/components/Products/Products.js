import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setProducts,
  setSearchTerm,
  setCurrentPage,
  setCategories,
  setPriceRange,
  setSelectedCategories,
  setSortOption,
} from "../../redux/actions/action";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.products.categories);
  const searchTerm = useSelector((state) => state.products.searchTerm);
  const currentPage = useSelector((state) => state.products.currentPage);
  const selectedCategories = useSelector(
    (state) => state.products.selectedCategories
  );
  const priceRange = useSelector((state) => state.products.priceRange);
  const sortOption = useSelector((state) => state.products.sortOption);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        dispatch(setProducts(response.data));

        const allCategories = [
          ...new Set(response.data.map((product) => product.category)),
        ];
        dispatch(setCategories(allCategories));

        const prices = response.data.map((product) => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        dispatch(setPriceRange([minPrice, maxPrice]));
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (event.target.checked) {
      dispatch(setSelectedCategories([...selectedCategories, category]));
    } else {
      dispatch(
        setSelectedCategories(
          selectedCategories.filter((cat) => cat !== category)
        )
      );
    }
    dispatch(setCurrentPage(1));
  };

  const handlePriceChange = () => {
    dispatch(setPriceRange([Number(minPrice), Number(maxPrice)]));
    dispatch(setCurrentPage(1));
  };

  const handleSortChange = (event) => {
    dispatch(setSortOption(event.target.value));
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const filteredProducts = (products || [])
    .filter(
      (product) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "title-asc") return a.title.localeCompare(b.title);
      if (sortOption === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  const productsPerPage = 6;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const allProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="home-container">
      <div className="filter-container">
        <h4>Filter By Category</h4>
        <div className="category-container">
          {categories.map((category) => (
            <div className="category" key={category}>
              <label className="category-label">
                <input
                  type="checkbox"
                  className="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                />
                {category}
              </label>
            </div>
          ))}
        </div>
        <h4>Filter By Price</h4>
        <div className="price-container">
          <label>Min Price: </label>
          <input
            type="number"
            className="form-control"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={handlePriceChange}
          />
          <label>Max Price: </label>
          <input
            type="number"
            className="form-control"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={handlePriceChange}
          />
        </div>
      </div>
      <div className="products-main-container">
        <div className="top-container">
          <div>
            <input
              type="text"
              placeholder="Search for products..."
              onChange={handleSearch}
              value={searchTerm}
              className="search"
            />
          </div>
          <div>
            <select
              value={sortOption}
              className="sort-dropdown form-control"
              onChange={handleSortChange}
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Title: A to Z</option>
              <option value="title-desc">Title: Z to A</option>
            </select>
          </div>
        </div>
        <div className="products-container">
          {allProducts.map((product) => (
            <div
              key={product.id}
              className="products-inner-container"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-img"
              />
              <h4 className="product-title">{product.title.slice(0, 25)}</h4>
              <h4 className="product-price">$ {product.price}</h4>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              className={`pagination-button ${
                currentPage === number ? "active" : ""
              }`}
              key={number}
              onClick={() => dispatch(setCurrentPage(number))}
            >
              {number}
            </button>
          ))}
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={indexOfLastProduct >= filteredProducts.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
