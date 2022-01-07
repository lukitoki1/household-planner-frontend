import { Service, ServiceResponse } from './Service';
import { ChoreDTO, EditChoreRequest } from '../dto';

class ChoreService extends Service {
  getHouseholdChores = (householdID: number): ServiceResponse<ChoreDTO[]> =>
    this.api.get(`/households/${householdID}/chores`);

  createHouseholdChore = (householdID: number, payload: EditChoreRequest): ServiceResponse<void> =>
    this.api.post(`/households/${householdID}/chores`, payload);

  getChoreDetails = (id: number): ServiceResponse<ChoreDTO> => this.api.get(`/chores/${id}`);

  updateChore = (id: number, payload: EditChoreRequest): ServiceResponse<void> =>
    this.api.put(`/chores/${id}`, payload);

  deleteChore = (id: number): ServiceResponse<void> => this.api.delete(`/chores/${id}`);
}

export const choreService = new ChoreService();
