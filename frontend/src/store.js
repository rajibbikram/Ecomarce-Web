import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import productReducer, { newReviewReducer, productDetailsReducer } from './reducers/productReducer.js';
import { userReducer } from './reducers/userReducer.js';
import { forgotPasswordReducer, profileReducer } from './reducers/profileReducer.js';
import cartReducer from './reducers/cardReaducers.js';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from './reducers/orderReducers.js';

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDetailsReducer,
  newReview: newReviewReducer,

});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  user: {
    isAuthenticated: !!userInfoFromStorage,
    user: userInfoFromStorage,
    loading: false,
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
