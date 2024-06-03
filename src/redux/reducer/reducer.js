import {
  SET_PRODUCTS,
  SET_SEARCH_TERM,
  SET_CURRENT_PAGE,
  SET_SELECTED_CATEGORIES,
  SET_CATEGORIES,
  SET_PRICE_RANGE,
  SET_SORT_OPTION,
  GET_SINGLE_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  LOAD_CART_FROM_STORAGE,
} from "../actions/action";

const initialState = {
  products: [],
  searchTerm: "",
  currentPage: 1,
  selectedCategories: [],
  categories: [],
  priceRange: [0, 1000],
  sortOption: ""
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.products };
    
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: action.searchTerm };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_SELECTED_CATEGORIES:
      return { ...state, selectedCategories: action.categories };
    case SET_CATEGORIES:
      return { ...state, categories: action.categories };
    case SET_PRICE_RANGE:
      return { ...state, priceRange: action.range };
    case SET_SORT_OPTION:
      return { ...state, sortOption: action.sortOption };
    default:
      return state;
  }
};



export const productReducer = (state = {product: {}}, action) => {
  switch(action.type) {
    case GET_SINGLE_PRODUCT:
      return { ...state, product: action.payload };
    default:
      return state

  }
}


export const cartReducer = (state = {cartItems: [],}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cartItems.find(
        (item) => item.id === action.product.id
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.product, quantity: 1 }],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.productId
        ),
      };

    case INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case LOAD_CART_FROM_STORAGE:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    default:
      return state;
  }
};