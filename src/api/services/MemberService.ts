import { Service, ServiceResponse } from './Service';
import { AddMemberRequest } from '../dto';

class MemberService extends Service {
  deleteMember = (householdID: number, userID: number): ServiceResponse<void> =>
    this.api.delete(`/members`, { params: { householdID, userID } });

  addMember = (payload: AddMemberRequest): ServiceResponse<void> =>
    this.api.post(`/members`, payload);
}

export const memberService = new MemberService();
