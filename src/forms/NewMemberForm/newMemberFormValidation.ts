import * as yup from 'yup';
import { NewMemberFormFields } from './newMemberFormValues';

const MEMBER_EMAIL_MAX = 100;

export const newMemberFormValidationSchema = yup.object().shape({
  [NewMemberFormFields.EMAIL]: yup
    .string()
    .required('Pole jest wymagane')
    .max(MEMBER_EMAIL_MAX, `Długość adresu e-mail nie może przekroczyć ${MEMBER_EMAIL_MAX} znaków`),
});
