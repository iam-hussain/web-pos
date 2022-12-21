import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getMessage } from "@helpers/message";
import { GET_CATEGORY } from "@graphql/query";
import { useQuery, useMutation } from "@apollo/client";
import { CATEGORY_DELETE } from "@graphql/mutation";
import {
  transformTableCategory,
  transformSelectCategory,
} from "@transformers/category";

type InitialState = {
  loading: boolean;
  error: boolean;
  called: boolean;
  refetch: Function | undefined;
  categories: any[];
  tableCategories: any;
  selectCategories: any[];
};

const initialState: InitialState = {
  loading: true,
  error: false,
  called: false,
  refetch: undefined,
  categories: [],
  tableCategories: {},
  selectCategories: [],
};

export const Slice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        error: false,
        loading: false,
        categories: action.payload,
        tableCategories: transformTableCategory(action.payload),
        selectCategories: transformSelectCategory(action.payload),
      };
    },
    catchCategories: (state) => {
      return {
        ...state,
        loading: false,
        called: true,
        error: true,
        categories: [],
        tableCategories: {},
        selectCategories: [],
      };
    },
    resetCategories: () => {
      return initialState;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setCategories, catchCategories, resetCategories } =
  Slice.actions;

export default Slice.reducer;
