import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    CLEAR_ERROR,
} from "../constants/productConstants";

// Fetch all products
export const getProduct = (keyword = "", page = 1, price = null, category = null) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        let link = `/api/v1/products?page=${page}`;

        if (keyword) {
            link += `&keyword=${keyword}`;
        }

        if (price && price.length === 2 && price[0] !== null && price[1] !== null) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        }

        if (category && category !== "All") {
            link += `&category=${encodeURIComponent(category)}`;
        }

        console.log("Searching with keyword:", keyword, "page:", page, "price:", price, "category:", category);
        console.log("API Link:", link);

        const { data } = await axios.get(link);

        console.log("API Response:", data);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error("Search Error:", error);
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Fetch product details by ID
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Submit a review
export const submitReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/v1/review`, reviewData, config);

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Clear errors
export const clearError = () => (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
