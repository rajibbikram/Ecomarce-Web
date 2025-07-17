import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CLEAR_ERROR,
} from "../constants/userConstants";

// Login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    // Save to localStorage (optional)
    localStorage.setItem("userInfo", JSON.stringify(data.user));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        // Fixed typo: changed "multipart/from-data" to "multipart/form-data"
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(`/api/v1/register`, userData, config);

    // Optional: Save user info to localStorage if desired
    // localStorage.setItem("userInfo", JSON.stringify(data.user));

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Clear Errors
export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
