import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  loading: boolean;
  error: boolean;
  called: boolean;
  products: any[];
};

const initialState: InitialState = {
  loading: true,
  error: false,
  called: false,
  products: [],
};

export const Slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductLoading: (state) => {
      return {
        ...state,
        called: true,
        loading: true,
      };
    },
    setProducts: (state, action: PayloadAction<any>) => {
      return {
        loading: false,
        error: false,
        called: true,
        products: action.payload,
      };
    },
    catchProducts: (state) => {
      return {
        ...initialState,
        loading: false,
        error: true,
        called: true,
      };
    },
    resetProducts: () => {
      return initialState;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setProducts, catchProducts, resetProducts, setProductLoading } =
  Slice.actions;

export default Slice.reducer;
