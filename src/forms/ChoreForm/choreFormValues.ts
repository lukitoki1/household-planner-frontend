export enum ChoreFormFields {
  NAME = 'name',
  DESCRIPTION = 'description',
  DESCRIPTION_LANGUAGE = 'descriptionLanguage',
  START_DATE = 'startDate',
  INTERVAL = 'interval',
}

export interface ChoreFormValues {
  [ChoreFormFields.NAME]: string;
  [ChoreFormFields.DESCRIPTION]: string;
  [ChoreFormFields.DESCRIPTION_LANGUAGE]: string;
  [ChoreFormFields.START_DATE]: Date;
  [ChoreFormFields.INTERVAL]: number;
}
