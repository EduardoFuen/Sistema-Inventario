import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { HOST, HEADER } from 'config';
// third-party
import { CognitoUser, CognitoUserPool,AuthenticationDetails } from 'amazon-cognito-identity-js';

// action - state management
import { LOGIN, LOGOUT, LOADING} from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project imports
//import Loader from 'components/Loader';
import { AWS_API } from 'config';
import { AWSCognitoContextType, InitialLoginContextProps } from 'types/auth';

// constant
const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  error: null,
  isLoading: false
};

export const userPool: any = new CognitoUserPool({
  UserPoolId: AWS_API.poolId || 'us-east-1_m40dlq2m1',
  ClientId: AWS_API.appClientId || '2ujvdva5u5b1hdkrfrp2j00p1o'
});

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
  } else {
    localStorage.removeItem('serviceToken');
  }
};

// ==============================|| AWS Cognito CONTEXT & PROVIDER ||============================== //

const AWSCognitoContext = createContext<AWSCognitoContextType | null>(null);

export const AWSCognitoProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      console.log("pave47")
      dispatch({
        type: LOGOUT
      });
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({
      type: LOADING,
      payload: {
        isLoggedIn: false,
        isLoading: true
      }
    });
    const usr = new CognitoUser({
      Username: email,
      Pool: userPool
    });
    console.log(usr);
    const authData = new AuthenticationDetails({
      Username: email,
      Password: password
    });
    console.log(authData);
    const data = {
      email,
      password
    }
    const response = await axios.post(`${HOST}/auth`, { ...data }, { ...HEADER });
      if(response.data.username){
        console.log("94")
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user: {
              email: response.data.username,
              name: response.data.username,
              role: response.data.userRol
            }
          }
        });
        return response.data
      }else{
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: false,
            user: null
          }
        });
        dispatch({
          type: LOADING,
          payload: {
            isLoggedIn: false,
            isLoading: false
          }
        });
        dispatch({ type: LOGOUT });
        
        return null
      }

  };

  const register = (email: string, password: string, firstName: string, lastName: string, role: string) =>
    new Promise((success, rej) => {
      const data = {
        email,
        password,
        firstName,
        role,
        lastName,
      }
      axios.post(`${HOST}/auth/register`, { ...data }, { ...HEADER })
      .then(function (response) {
        console.log(response);
        success(response);
      })
      .catch(function (error) {
        console.log(error);
        rej(error);
      });
  
    });

  const logout = () => {
    const loggedInUser = userPool.getCurrentUser();
    if (loggedInUser) {
      setSession(null);
      loggedInUser.signOut();
      localStorage.clear();
      dispatch({ type: LOGOUT });
    }
  };

  const resetPassword = async (email: string) => {};
  const updateProfile = () => {};

  /*if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }*/

  return (
    <AWSCognitoContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>
      {children}
    </AWSCognitoContext.Provider>
  );
};

export default AWSCognitoContext;
