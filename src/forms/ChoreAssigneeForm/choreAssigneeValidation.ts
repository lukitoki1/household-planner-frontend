import * as yup from 'yup';
import { EMAIL_MAX } from '../../values';
import { ChoreAssigneeFormFields } from './choreAssigneeValues';

export const choreAssigneeFormValidationSchema = yup.object().shape({
  [ChoreAssigneeFormFields.EMAIL]: yup
    .string()
    .required('Pole jest wymagane')
    .max(EMAIL_MAX, `Długość adresu e-mail nie może przekroczyć ${EMAIL_MAX} znaków`),
});
