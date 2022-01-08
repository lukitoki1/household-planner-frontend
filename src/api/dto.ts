import { Languages } from '../values';

export interface EditHouseholdRequest {
  name: string;
}

export interface HouseholdDTO {
  id: number;
  name: string;
}

export interface EditUserRequest {
  name: string;
}

export interface UserDTO {
  id: number;
  name: string;
  email: string;
}

export interface ChoreFilterParams {
  name?: string;
  interval?: number;
}

export interface EditChoreRequest {
  name: string;
  description: string;
  startDate: string;
  intervalDays: number;
  language: string;
}

export interface ChoreDTO {
  id: number;
  name: string;
  description: string;
  user?: UserDTO;
  household: HouseholdDTO;
  startDate: string;
  nextOccurence: string;
  intervalDays: number;
  language: keyof Languages;
}

export interface ChorePhotoDTO {
  name: string;
  url: string;
}
