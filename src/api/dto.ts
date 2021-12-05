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
  id: number;
  name: string;
  email: string;
}

export interface ChoreDTO {
  id: number;
  name: string;
  description: string;
  user?: UserDTO;
  household: HouseholdDTO;
  nextOccurrence: string;
}

export type GetHouseholdMembersResponse = UserDTO[]

export type GetHouseholdChoresResponse = ChoreDTO[]
