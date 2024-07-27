import { configureStore } from "@reduxjs/toolkit";
import bankReducer from "./features/bank/bankSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      bank: bankReducer,
    },
  });
};
