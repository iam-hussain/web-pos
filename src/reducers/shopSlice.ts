import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  loading: boolean;
  called: boolean;
  shop: any;
  connects: Array<any>;
};

const initialState: InitialState = {
  loading: true,
  called: false,
  shop: {},
  connects: [],
};

export const Slice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShop: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loading: false,
        called: true,
        shop: action.payload,
      };
    },
    setConnects: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        connects: action.payload,
      };
    },
    resetShop: () => {
      return initialState;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setShop, setConnects, resetShop } = Slice.actions;

export default Slice.reducer;
