import { useContext } from 'react';
import { AuthContext } from './authProvider';
import { UserDTO } from '../../api/dto';

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const user = state.user;

  const logUserIn = (user: UserDTO) => {
    dispatch({ ...state, user });
  };

  const logUserOut = () => {
    dispatch({ ...state, user: undefined });
  };

  const isUserLoggedIn = !!state.user;

  return { user, logUserIn, logUserOut, isUserLoggedIn };
};
