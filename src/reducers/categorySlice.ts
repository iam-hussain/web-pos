import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  transformTableCategory,
  transformSelectCategory,
} from "@transformers/category";

type InitialState = {
  loading: boolean;
  error: boolean;
  called: boolean;
  categories: any[];
  tableCategories: any;
  selectCategories: any[];
};

const initialState: InitialState = {
  loading: false,
  error: false,
  called: false,
  categories: [],
  tableCategories: {},
  selectCategories: [],
};

export const Slice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryLoading: (state) => {
      return {
        ...state,
        called: true,
        loading: true,
      };
    },
    setCategories: (_, action: PayloadAction<any>) => {
      return {
        loading: false,
        error: false,
        called: true,
        categories: action.payload,
        tableCategories: transformTableCategory(action.payload),
        selectCategories: transformSelectCategory(action.payload),
      };
    },
    catchCategories: () => {
      return {
        ...initialState,
        loading: false,
        error: true,
        called: true,
      };
    },
    resetCategories: () => {
      return initialState;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  setCategories,
  catchCategories,
  resetCategories,
  setCategoryLoading,
} = Slice.actions;

export default Slice.reducer;
