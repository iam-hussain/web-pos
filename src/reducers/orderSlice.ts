import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  id: number;
  items: Array<any>;
};

const initialState: InitialState = {
  id: 0,
  items: [],
};

export const Slice = createSlice({
  name: "order",
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
export const {} = Slice.actions;

export default Slice.reducer;
