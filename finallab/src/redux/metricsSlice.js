import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allEmojis: [],
  isLoadingAll: false,
  errorAll: null,
};

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    // Other reducers...

    fetchAllEmojisStart: (state) => {
      state.isLoadingAll = true;
      state.errorAll = null;
    },
    fetchAllEmojisSuccess: (state, action) => {
      state.allEmojis = action.payload;
      state.isLoadingAll = false;
    },
    fetchAllEmojisFailure: (state, action) => {
      state.errorAll = action.payload;
      state.isLoadingAll = false;
    },
  },
});

export const {
  fetchAllEmojisStart,
  fetchAllEmojisSuccess,
  fetchAllEmojisFailure,
} = metricsSlice.actions;

export const fetchAllEmojis = (category) => async (dispatch) => {
  try {
    let apiUrl = 'https://emojihub.yurace.pro/api/all';
    
    if (category) {
      apiUrl += `/category/${category}`;
    }

    dispatch(fetchAllEmojisStart());

    const response = await axios.get(apiUrl);
    dispatch(fetchAllEmojisSuccess(response.data));
  } catch (error) {
    dispatch(fetchAllEmojisFailure(error.message));
  }
};

export default metricsSlice.reducer;
