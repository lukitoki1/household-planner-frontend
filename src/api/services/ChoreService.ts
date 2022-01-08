import { Service, ServiceResponse } from './Service';
import { ChoreDTO, ChorePhotoDTO, EditChoreRequest } from '../dto';

class ChoreService extends Service {
  getHouseholdChores = (householdID: number): ServiceResponse<ChoreDTO[]> =>
    this.api.get(`/households/${householdID}/chores`);

  createHouseholdChore = (householdID: number, payload: EditChoreRequest): ServiceResponse<void> =>
    this.api.post(`/households/${householdID}/chores`, payload);

  getChoreDetails = (id: number): ServiceResponse<ChoreDTO> => this.api.get(`/chores/${id}`);

  getChoreDescription = (id: number, language: string): ServiceResponse<string> =>
    this.api.get(`/chores/${id}/description`, { params: { language } });

  updateChore = (id: number, payload: EditChoreRequest): ServiceResponse<void> =>
    this.api.put(`/chores/${id}`, payload);

  deleteChore = (id: number): ServiceResponse<void> => this.api.delete(`/chores/${id}`);

  addAssignee = (choreID: number, userEmail: string): ServiceResponse<void> =>
    this.api.post(`/chores/${choreID}/assignee`, undefined, { params: { email: userEmail } });

  deleteAssignee = (choreID: number): ServiceResponse<void> =>
    this.api.delete(`/chores/${choreID}/assignee`);

  getPhotos = (choreID: number): ServiceResponse<ChorePhotoDTO[]> =>
    this.api.get(`/chores/${choreID}/photos`);

  getPhoto = (choreID: number, photoName: string): ServiceResponse<ChorePhotoDTO> =>
    this.api.get(`/chores/${choreID}/photos/${photoName}`);

  addPhoto = (choreID: number, payload: FormData): ServiceResponse<void> =>
    this.api.post(`/chores/${choreID}/photos`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

  deletePhoto = (choreID: number, photoName: string): ServiceResponse<ChorePhotoDTO> =>
    this.api.delete(`/chores/${choreID}/photos/${photoName}`);
}

export const choreService = new ChoreService();
