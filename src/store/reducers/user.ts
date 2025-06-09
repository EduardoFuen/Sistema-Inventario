// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { HOST, HEADER } from 'config';
import { dispatch } from '../index';


// types
import { UserStateProps } from 'types/supplier';

// initial state
const initialState: UserStateProps = {
  error: null,
  userList: []
};

// ==============================||  SUPPLIER  REDUCER ||============================== //

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET SUPPLIERS

    getUserSuccess(state, action) {
      state.userList = action.payload;
    },
  }
});
// Reducer
export default slice.reducer;



export function getUserList() {
  return async () => {
    try {
      const response = await axios.get(`${HOST}/auth`, HEADER);
      if (response.data instanceof Array) {
        dispatch(slice.actions.getUserSuccess(response.data));
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        dispatch(slice.actions.getUserSuccess([]));
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}

