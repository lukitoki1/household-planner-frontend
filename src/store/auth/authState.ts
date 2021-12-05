import { UserDTO } from '../../api/dto';

export interface AuthState {
  user?: UserDTO;
}

export const initialAuthState: AuthState = {};
