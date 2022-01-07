export const HOUSEHOLD_ID_PARAM = 'householdID';
export const CHORE_ID_PARAM = 'choreID';

export interface HouseholdDetailsParams {
  [HOUSEHOLD_ID_PARAM]: string;
}

export interface HouseholdEditorParams {
  [HOUSEHOLD_ID_PARAM]: string;
}

export interface ChoreDetailsParams {
  [CHORE_ID_PARAM]: string;
}

export interface ChoreEditorParams {
  [CHORE_ID_PARAM]: string;
}

export interface ChoreCreatorRouterState {
  [HOUSEHOLD_ID_PARAM]: string;
}

export const routes = {
  default: '/',

  login: '/login',

  userEditor: '/edit_user',

  householdsList: '/households',
  householdCreator: '/households/new',
  householdDetails: `/households/:${HOUSEHOLD_ID_PARAM}`,
  householdEditor: `/households/:${HOUSEHOLD_ID_PARAM}/edit`,

  choreCreator: '/chores/new',
  choreDetails: `/chores/:${CHORE_ID_PARAM}`,
  choreEditor: `/chores/:${CHORE_ID_PARAM}/edit`,
};
