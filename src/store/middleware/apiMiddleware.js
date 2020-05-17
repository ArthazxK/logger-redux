import axios from "axios";
import { apiCallBegan, apiCallSuccess, apiCallFailed } from "../api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const res = await axios.request({
      baseURL: "http://localhost:5000",
      url,
      method,
      data,
    });
    // General
    dispatch(apiCallSuccess(res.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
  } catch (error) {
    // General
    dispatch(apiCallFailed(error.message));
    // Especific
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
