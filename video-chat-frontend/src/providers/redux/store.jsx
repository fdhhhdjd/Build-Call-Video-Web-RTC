/* eslint-disable @typescript-eslint/no-explicit-any */
//* LIB
import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "redux-logger";

//* IMPORT
import CallSlice from "./call/slice";
import AuthSlice from "./auth/slice";

const middlewares = [];

middlewares.push(loggerMiddleware);

export const store = configureStore({
  reducer: {
    call: CallSlice,
    auth: AuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
  devTools: true,
});
