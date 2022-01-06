import * as yup from 'yup';
import { NewMemberFormFields } from './newMemberFormValues';
import { EMAIL_MAX } from '../../values';

export const newMemberFormValidationSchema = yup.object().shape({
  [NewMemberFormFields.EMAIL]: yup
    .string()
    .required('Pole jest wymagane')
    .max(EMAIL_MAX, `Długość adresu e-mail nie może przekroczyć ${EMAIL_MAX} znaków`),
});
