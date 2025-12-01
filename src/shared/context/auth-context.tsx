import { createContext } from 'react';

export type AuthContextType = {
  isLoggedIn: boolean;
  userId: string | null;
  token: string | null;
  login: (...args: any[]) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
