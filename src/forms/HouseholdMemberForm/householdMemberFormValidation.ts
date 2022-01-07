import * as yup from 'yup';
import { HouseholdMemberFormFields } from './householdMemberFormValues';
import { EMAIL_MAX } from '../../values';

export const householdMemberFormValidationSchema = yup.object().shape({
  [HouseholdMemberFormFields.EMAIL]: yup
    .string()
    .required('Pole jest wymagane')
    .max(EMAIL_MAX, `Długość adresu e-mail nie może przekroczyć ${EMAIL_MAX} znaków`),
});
