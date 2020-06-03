import axios from "axios";
import { apiCallBegan, apiCallSuccess, apiCallFailed } from "../api";
import { getJWT } from "../../services/auth";
import M from "materialize-css/dist/js/materialize.min.js";

axios.defaults.headers.common["x-auth-token"] = getJWT();

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
    const jwt = res.headers["x-auth-token"];
    if (jwt) {
      localStorage.setItem("token", jwt);
    }
    dispatch(apiCallSuccess(res.data));

    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
  } catch (error) {
    // General
    dispatch(apiCallFailed(error.message));
    // Especific
    M.toast({ html: error.response.data, classes: "red" });
    if (onError) dispatch({ type: onError, payload: error.response.data });
  }
};

export default api;
