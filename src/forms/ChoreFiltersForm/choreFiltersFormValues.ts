export enum ChoreFiltersFormFields {
  NAME = 'name',
  INTERVAL = 'interval',
}

export interface ChoreFiltersFormValues {
  [ChoreFiltersFormFields.NAME]: string;
  [ChoreFiltersFormFields.INTERVAL]: string;
}
