import * as yup from 'yup';
import { HouseholdCreatorFormFields } from './householdCreatorFormValues';

const HOUSEHOLD_NAME_MAX = 100;

export const householdCreatorFirmValidationSchema = yup.object().shape({
  [HouseholdCreatorFormFields.NAME]: yup
    .string()
    .required('Pole jest wymagane')
    .max(
      HOUSEHOLD_NAME_MAX,
      `Nazwa gospodarstwa domowego nie może przekroczyć ${HOUSEHOLD_NAME_MAX} znaków`,
    ),
});
