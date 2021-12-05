import { Service, ServiceResponse } from './Service';
import { EditHouseholdRequest, HouseholdDTO } from '../dto';

class HouseholdService extends Service {
  getHouseholdsList = (): ServiceResponse<HouseholdDTO> => this.api.get('/households');

  getHouseholdDetails = (id: number): ServiceResponse<HouseholdDTO> =>
    this.api.get(`/households/${id}`);

  createHousehold = (payload: EditHouseholdRequest): ServiceResponse<void> =>
    this.api.post('/households', payload);

  updateHousehold = (id: number, payload: EditHouseholdRequest): ServiceResponse<void> =>
    this.api.put(`/households/${id}`, payload);

  deleteHousehold = (id: number): ServiceResponse<void> => this.api.delete(`/households/${id}`);

  deleteMember = (householdID: number, userID: number): ServiceResponse<void> =>
    this.api.delete(`/households/${householdID}/members/${userID}`);
}

export const householdService = new HouseholdService();
