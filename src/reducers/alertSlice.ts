import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getMessage } from "@helpers/message";

type InitialState = {
  severity: "success" | "error" | "info" | "warning";
  open: boolean;
  message: string;
};

const initialState: InitialState = {
  severity: "info",
  open: false,
  message: "",
};

type OPEN = {
  severity: "success" | "error" | "info" | "warning";
  message: string;
};

export const Slice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    openAlert: (state, action: PayloadAction<OPEN>) => {
      return {
        ...state,
        ...action.payload,
        open: true,
        message: getMessage(action.payload.message),
      };
    },
    closeAlert: (state) => {
      return {
        ...state,
        open: false,
      };
    },
    resetAlert: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { openAlert, closeAlert } = Slice.actions;

export default Slice.reducer;
