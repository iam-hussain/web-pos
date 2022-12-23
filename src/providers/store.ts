import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "@reducers/authenticateSlice";
import alertReducer from "@reducers/alertSlice";
import categoryReducer from "@reducers/categorySlice";
import orderReducer from "@reducers/orderSlice";
import productReducer from "@reducers/productSlice";
import shopReducer from "@reducers/shopSlice";

export const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
    alert: alertReducer,
    category: categoryReducer,
    order: orderReducer,
    product: productReducer,
    shop: shopReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
