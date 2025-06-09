// action - state management
import { REGISTER, LOGIN, LOGOUT, FAILED_LOGIN, LOADING } from './actions';

// types
import { AuthProps, AuthActionProps } from 'types/auth';

// initial state
export const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  error: null,
  isLoading: false
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action: AuthActionProps) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload!;
      return {
        ...state,
        user
      };
    }
    case LOADING: {
      const { isLoading } = action.payload!;
      return {
        ...state,
        isLoading
      };
    }
    case LOGIN: {
      console.log("auth.ts35")
      const { user } = action.payload!;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
      };
    }
    case FAILED_LOGIN: {
      const { error } = action.payload!;
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
        error
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default auth;
