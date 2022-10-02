
import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '../pages/main/main.slice';

export const store = configureStore({
  reducer: counterReducer.reducer,
})

export type RootState = ReturnType<typeof store.getState>
