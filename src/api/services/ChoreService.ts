import { Service, ServiceResponse } from './Service';
import { ChoreDTO } from '../dto';

class ChoreService extends Service {
  deleteChore = (id: number): ServiceResponse<void> => this.api.delete(`/chores/${id}`);

  getHouseholdChores = (householdID: number): ServiceResponse<ChoreDTO[]> =>
    this.api.get(`/chores`, { params: { householdID } });
}

export const choreService = new ChoreService();
