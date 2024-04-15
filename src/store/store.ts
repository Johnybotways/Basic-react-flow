import { configureStore } from '@reduxjs/toolkit'
import flowReducer from './flowSlice/flowSlice'
export const store = configureStore({
  reducer: {
    flow : flowReducer,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch