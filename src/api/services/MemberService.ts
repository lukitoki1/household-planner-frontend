import { Service, ServiceResponse } from './Service';
import { AddMemberRequest, UserDTO } from '../dto';

class MemberService extends Service {
  deleteMember = (householdID: number, userID: number): ServiceResponse<void> =>
    this.api.delete(`/members`, { params: { householdID, userID } });

  addMember = (payload: AddMemberRequest): ServiceResponse<void> =>
    this.api.post(`/members`, payload);

  getHouseholdMembers = (householdID: number): ServiceResponse<UserDTO[]> =>
    this.api.get(`/members`, { params: { householdID } });
}

export const memberService = new MemberService();
