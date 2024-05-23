import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import profileSlice from "./ProfileSlice";

const store = configureStore({
  reducer: {
    auth: profileSlice,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
