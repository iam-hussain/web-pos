import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  token: "",
  hasTokenDataL: false,
  hasShop: false,
  hasUser: false,
  isPOS: false,
  user: {} as any,
  shop: {} as any,
  shopIds: [],
};

export const Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUpdate: (state, action: PayloadAction<any>) => {
      state = { ...action.payload };
    },
    authReset: (state) => {
      state = { ...initialState };
    },
  },
});

// Action creators are generated for each case reducer function
export const { authUpdate, authReset } = Slice.actions;

export default Slice.reducer;
