import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  token: "",
  hasTokenData: false,
  isAuthenticated: false,
  hasShop: false,
  hasUser: false,
  isPOS: false,
  isPOSEmp: false,
  isUser: false,
  user: null,
  shop: null,
  shopIds: [],
};

export const Slice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    authUpdate: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    authReset: () => {
      return { ...initialState };
    },
  },
});

// Action creators are generated for each case reducer function
export const { authUpdate, authReset } = Slice.actions;

export default Slice.reducer;
