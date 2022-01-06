export interface EditHouseholdRequest {
  name: string;
}

export interface AddMemberRequest {
  householdID: number;
  userEmail: string;
}

export interface HouseholdDTO {
  id: number;
  name: string;
}

export interface UserDTO {
  id: string;
  name: string | null;
  email: string | null;
}

export interface ChoreDTO {
  id: number;
  name: string;
  description: string;
  user?: UserDTO;
  household: HouseholdDTO;
  nextOccurrenceDate: string;
  intervalDays: number;
}

export type GetHouseholdMembersResponse = UserDTO[];

export type GetHouseholdChoresResponse = ChoreDTO[];
