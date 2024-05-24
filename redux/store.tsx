import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import profileSlice from "./ProfileSlice";
import collectionSlice from "./CollectionSlice";

const store = configureStore({
  reducer: {
    auth: profileSlice,
    collection: collectionSlice,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
