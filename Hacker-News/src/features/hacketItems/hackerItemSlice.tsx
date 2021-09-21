import { createSlice, createSelector } from '@reduxjs/toolkit';
import { API_DOMAIN_NAME } from '../../constants/common';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/rootReducer';
import axiosInstance from '../../utils/axios-instance';
import { HackerItemsTypes } from './types';

const initialState: HackerItemsTypes.State = {
  items: [],
  authors: {},
  isLoading: false,
};

const hackerItems = createSlice({
  name: 'hackerItems',
  initialState,
  reducers: {
    getHackerItemsSuccess(state, action) {
      state.items.push(action.payload);
    },
    getAuthorSuccess(state, action) {
      const { data } = action.payload;
      const author = Object.assign({}, state.authors);
      author[data.id] = data;
      state.authors = author;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const selectHackerItems = createSelector(
  (state: RootState) => state.hackerItems.items,
  (selections) => [...selections].sort((a, b) => a.score - b.score),
);
export const selectAuthor = (state: RootState, id: string) => state.hackerItems.authors[id];
export const selectIsLoading = (state: RootState) => state.hackerItems.isLoading;

export const { getHackerItemsSuccess, getAuthorSuccess, setIsLoading } = hackerItems.actions;
export default hackerItems.reducer;

const getRandom = function (arr, n) {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len) {
    throw new RangeError('getRandom: more elements taken than available');
  }

  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

const fetchAuthor =
  (id: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const url = `${API_DOMAIN_NAME}/user/${id}.json`;
      const response = await axiosInstance.get(url);
      dispatch(getAuthorSuccess(response));
      dispatch(setIsLoading(false));
    } catch (err) {
      dispatch(setIsLoading(false));
      console.log(err);
    }
  };

const fetchHackerItem =
  (id) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const url = `${API_DOMAIN_NAME}/item/${id}.json `;
      const response = await axiosInstance.get(url);
      dispatch(getHackerItemsSuccess(response.data));
      dispatch(fetchAuthor(response.data.by));
    } catch (err) {
      dispatch(setIsLoading(false));
      console.log(err);
    }
  };

export const fetchHackerItems =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const url = `${API_DOMAIN_NAME}/topstories.json`;
      const response = await axiosInstance.get(url);
      dispatch(setIsLoading(true));
      const randomizeResult = getRandom(response.data, 10);
      randomizeResult.forEach((value) => dispatch(fetchHackerItem(value)));
    } catch (err) {
      dispatch(setIsLoading(false));
      console.log(err);
    }
  };
