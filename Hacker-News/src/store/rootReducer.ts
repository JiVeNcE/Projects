import { combineReducers } from '@reduxjs/toolkit';
import hackerItems from 'features/hacketItems/hackerItemSlice';

const rootReducer = combineReducers({
  hackerItems: hackerItems,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
