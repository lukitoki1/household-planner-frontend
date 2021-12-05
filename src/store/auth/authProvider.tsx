import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';
import { AuthState, initialAuthState } from './authState';

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<SetStateAction<AuthState>>;
}>({
  state: initialAuthState,
  dispatch: () => null,
});

export const AuthContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useState<AuthState>(initialAuthState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
