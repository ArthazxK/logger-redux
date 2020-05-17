import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import apiMiddleware from "./middleware/apiMiddleware";
import reducer from "./reducer";

export default () => {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), apiMiddleware],
  });
};
