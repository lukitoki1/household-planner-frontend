export const HOUSEHOLD_ID_PARAM = 'householdID';

export interface HouseholdDetailsParams {
  [HOUSEHOLD_ID_PARAM]: string;
}

export interface HouseholdEditorParams {
  [HOUSEHOLD_ID_PARAM]: string;
}

export const routes = {
  default: '/',
  householdsList: '/households',
  householdCreator: '/households/new',
  householdDetails: `/households/:${HOUSEHOLD_ID_PARAM}`,
  householdEditor: `/households/:${HOUSEHOLD_ID_PARAM}/edit`,
};
