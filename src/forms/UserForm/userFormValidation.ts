import * as yup from 'yup';
import { UserFormFields } from './userFormValues';
import { EMAIL_MAX } from '../../values';

export const editUserValidationSchema = yup.object().shape({
  [UserFormFields.NAME]: yup.string().required('Pole jest wymagane'),
  [UserFormFields.EMAIL]: yup
    .string()
    .required('Pole jest wymagane')
    .max(EMAIL_MAX, `Długość adresu e-mail nie może przekroczyć ${EMAIL_MAX} znaków`),
});
