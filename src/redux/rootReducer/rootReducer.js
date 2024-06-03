import { combineReducers } from 'redux';
import { cartReducer, productReducer } from '../reducer/reducer';

import { productsReducer } from '../reducer/reducer';

const rootReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
