import { ReactElement } from 'react';

// ==============================|| AUTH TYPES  ||============================== //

export type GuardProps = {
  children: ReactElement | null;
};

export type UserProfile = {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
};

export interface AuthProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  isLoading?: boolean;
  user?: UserProfile | null;
  token?: string | null;
  error?: object | string | null;
}

export interface AuthActionProps {
  type: string;
  payload?: AuthProps;
}

export type AWSCognitoContextType = {
  isLoggedIn: boolean;
  isLoading?: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  error?: object | string | null;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string, role: string) => Promise<unknown>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: VoidFunction;
};

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  isLoading?: boolean;
  user?: UserProfile | null | undefined;
  error?: object | string | null;
}
