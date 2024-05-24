import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CollectionStateType = [];

const todoSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollection: {
      reducer: (state: CollectionStateType, action: PayloadAction<any>) => {
        return action.payload;
      },
      prepare: (payload: any) => {
        return { payload };
      },
    },
  },
});

export const { setCollection } = todoSlice.actions;
export default todoSlice.reducer;

type CollectionStateType = any;
