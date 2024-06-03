import axios from "axios";

export const SET_PRODUCTS = "SET_PRODUCTS";
export const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_SELECTED_CATEGORIES = "SET_SELECTED_CATEGORIES";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRICE_RANGE = "SET_PRICE_RANGE";
export const SET_SORT_OPTION = "SET_SORT_OPTION";

export const setProducts = (products) => ({ type: SET_PRODUCTS, products });
export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  searchTerm,
});
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setSelectedCategories = (categories) => ({
  type: SET_SELECTED_CATEGORIES,
  categories,
});
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  categories,
});
export const setPriceRange = (range) => ({ type: SET_PRICE_RANGE, range });
export const setSortOption = (sortOption) => ({
  type: SET_SORT_OPTION,
  sortOption,
});

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const LOAD_CART_FROM_STORAGE = "LOAD_CART_FROM_STORAGE";

export const addToCart = (product) => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_TO_CART, product });
    const { cart } = getState();
    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
  };
};

export const removeFromCart = (productId) => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_CART, productId });
    const { cart } = getState();
    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
  };
};

export const increaseQuantity = (productId) => {
  return (dispatch, getState) => {
    dispatch({ type: INCREASE_QUANTITY, productId });
    const { cart } = getState();
    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
  };
};

export const decreaseQuantity = (productId) => {
  return (dispatch, getState) => {
    dispatch({ type: DECREASE_QUANTITY, productId });
    const { cart } = getState();
    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
  };
};

export const loadCartFromStorage = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  return { type: LOAD_CART_FROM_STORAGE, cartItems };
};

export const getSingleProduct = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    dispatch({type: GET_SINGLE_PRODUCT, payload: response.data});
  };
};
