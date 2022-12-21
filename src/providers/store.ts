import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "@reducers/authenticateSlice";
import alertReducer from "@reducers/alertSlice";
import categoryReducer from "@reducers/categorySlice";

export const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
    alert: alertReducer,
    category: categoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
