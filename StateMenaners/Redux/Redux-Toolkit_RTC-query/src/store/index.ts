import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './counter/slice';
import { api } from './api/api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Это нужно для refetchOnFocus/refetchOnReconnect  о чем далее
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
