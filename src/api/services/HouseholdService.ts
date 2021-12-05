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
}

export const householdService = new HouseholdService();
