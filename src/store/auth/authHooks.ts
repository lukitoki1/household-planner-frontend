import { useContext } from 'react';
import { AuthContext } from './authProvider';
import { UserDTO } from '../../api/dto';

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const user = state.user;

  const isUserLoggedIn = !!state.user;

  const isAuthLoading = !!state.isLoading;

  const logUserIn = (user: UserDTO) => {
    dispatch((s) => ({ ...s, user }));
  };

  const logUserOut = () => {
    dispatch((s) => ({ ...s, user: undefined }));
  };

  const setAuthLoading = (loading: boolean) => {
    dispatch((s) => ({ ...s, isLoading: loading }));
  };

  return { state, user, isUserLoggedIn, isAuthLoading, logUserIn, logUserOut, setAuthLoading };
};
