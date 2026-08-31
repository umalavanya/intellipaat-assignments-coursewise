import { configureStore } from '@reduxjs/toolkit';

const appReducer = (state = {}, action) => {
  return state;
};

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
