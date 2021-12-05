import { Service, ServiceResponse } from './Service';
import { CreateHouseholdRequest, HouseholdDTO } from '../dto';

class HouseholdService extends Service {
  createHousehold = (payload: CreateHouseholdRequest): ServiceResponse<void> =>
    this.api.post('/households', payload);

  getHouseholdsList = (): ServiceResponse<HouseholdDTO> => this.api.get('/households');

  getHouseholdDetails = (id: number): ServiceResponse<HouseholdDTO> =>
    this.api.get(`/households/${id}`);
}

export const householdService = new HouseholdService();
