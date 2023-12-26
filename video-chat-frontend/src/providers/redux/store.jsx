//* LIB
import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "redux-logger";

//* IMPORT
import CallSlice from "./call/slice";
import AuthSlice from "./auth/slice";

const middlewares = [];

const shouldEnvironment = process.env.NODE_APP === "DEV";

if (shouldEnvironment) {
  middlewares.push(loggerMiddleware);
}

export const store = configureStore({
  reducer: {
    call: CallSlice,
    auth: AuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  devTools: shouldEnvironment ? true : false,
});
