import * as yup from 'yup';
import { HouseholdFormFields } from './householdFormValues';

const HOUSEHOLD_NAME_MAX = 100;

export const householdFormValidationSchema = yup.object().shape({
  [HouseholdFormFields.NAME]: yup
    .string()
    .required('Pole jest wymagane')
    .max(
      HOUSEHOLD_NAME_MAX,
      `Nazwa gospodarstwa domowego nie może przekroczyć ${HOUSEHOLD_NAME_MAX} znaków`,
    ),
});
