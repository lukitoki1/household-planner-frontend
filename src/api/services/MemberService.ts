import { Service, ServiceResponse } from './Service';
import { UserDTO } from '../dto';

class MemberService extends Service {
  deleteHouseholdMember = (householdID: number, userID: string): ServiceResponse<void> =>
    this.api.delete(`/households/${householdID}/members`, { params: { id: userID } });

  addHouseholdMember = (householdID: number, userEmail: string): ServiceResponse<void> =>
    this.api.post(`/households/${householdID}/members`, { params: { email: userEmail } });

  getHouseholdMembers = (householdID: number): ServiceResponse<UserDTO[]> =>
    this.api.get(`/households/${householdID}/members`);
}

export const memberService = new MemberService();
