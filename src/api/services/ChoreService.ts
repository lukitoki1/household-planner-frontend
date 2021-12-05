import { Service, ServiceResponse } from './Service';

class ChoreService extends Service {
  deleteChore = (id: number): ServiceResponse<void> => this.api.delete(`/chores/${id}`);
}

export const choreService = new ChoreService();
