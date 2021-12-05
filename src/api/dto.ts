export interface CreateHouseholdRequest {
  name: string;
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
  name: string;
  description: string;
  user: UserDTO;
  household: HouseholdDTO;
}

export type GetHouseholdMembersResponse = UserDTO[]

export type GetHouseholdChoresResponse = ChoreDTO[]
