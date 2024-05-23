import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ProfileStateType = {};

const todoSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: {
      reducer: (state: ProfileStateType, action: PayloadAction<any>) => {
        return action.payload;
      },
      prepare: (payload: any) => {
        return { payload };
      },
    },
  },
});

export const { setProfile } = todoSlice.actions;
export default todoSlice.reducer;

type ProfileStateType = any;
