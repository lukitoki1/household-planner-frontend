import { useContext } from 'react';
import { AuthContext } from './authProvider';
import { UserDTO } from '../../api/dto';

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const user = state.user;

  const isUserSet = !!state.user;

  const isAuthLoading = !!state.isLoading;

  const setUser = (user: UserDTO) => {
    dispatch((s) => ({ ...s, user }));
  };

  const clearUser = () => {
    dispatch((s) => ({ ...s, user: undefined }));
  };

  const setAuthLoading = (loading: boolean) => {
    dispatch((s) => ({ ...s, isLoading: loading }));
  };

  return { state, user, isUserSet, isAuthLoading, setUser, clearUser, setAuthLoading };
};
