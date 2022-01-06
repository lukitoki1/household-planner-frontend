import { Service, ServiceResponse } from './Service';
import { EditUserRequest, UserDTO } from '../dto';

class UserService extends Service {
  updateUser = (id: number, payload: EditUserRequest): ServiceResponse<void> =>
    this.api.put(`/users/${id}`, payload);

  loginOrRegisterUser = (email: string): ServiceResponse<UserDTO> =>
    this.api.post(`/login`, undefined, { params: { email } });
}

export const userService = new UserService();
