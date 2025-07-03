import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_SUCCESS,
    CLEAR_ERROR,
} from "../constants/productConstants";

const initialState = {
    loading: false,
    products: [],
    productCount: 0,
    error: null,
};

const productReducer = (state = initialState, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                products: [],
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                error: null,
            };
        case ALL_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};


export const productDetailsReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                loading: true,
                 ...state,
            };
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload,
               
            };
        case  PRODUCT_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export default productReducer;
