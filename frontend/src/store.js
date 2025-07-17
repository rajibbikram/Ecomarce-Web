import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import productReducer, { productDetailsReducer } from './reducers/productReducer.js'; 
import { userReducer } from "./reducers/userReducer.js";

const rootReducer = combineReducers({
  products: productReducer, 
  productDetails: productDetailsReducer, 
  user:userReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer, 
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
