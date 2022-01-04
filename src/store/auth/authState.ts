import { UserDTO } from '../../api/dto';

export interface AuthState {
  isLoading?: boolean;
  user?: UserDTO;
}

export const initialAuthState: AuthState = {};
