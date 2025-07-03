import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import productReducer from './reducers/productReducer.js'; 
import productDetailsReducer from './reducers/productReducer.js';


const rootReducer = combineReducers({
  products: productReducer, 
  productDetails:productDetailsReducer, 
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer, 
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
