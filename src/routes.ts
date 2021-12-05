export interface HouseholdDetailsParams {
  householdID: string;
}

export const routes = {
  default: '/',
  householdsList: '/households',
  householdCreator: '/households/new',
  householdDetails: '/households/:householdID',
};
