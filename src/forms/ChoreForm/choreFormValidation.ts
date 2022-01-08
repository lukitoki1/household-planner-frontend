import * as yup from 'yup';
import { ChoreFormFields } from './choreFormValues';
import { CHORE_DESCRIPTION_MAX, CHORE_NAME_MAX } from '../../values';

export const choreFormValidationSchema = yup.object().shape({
  [ChoreFormFields.NAME]: yup
    .string()
    .required('Pole jest wymagane')
    .max(CHORE_NAME_MAX, `Nazwa obowiązku domowego nie może przekroczyć ${CHORE_NAME_MAX} znaków`),
  [ChoreFormFields.DESCRIPTION]: yup
    .string()
    .required('Pole jest wymagane')
    .max(
      CHORE_DESCRIPTION_MAX,
      `Opis obowiązku domowego nie może przekroczyć ${CHORE_DESCRIPTION_MAX} znaków`,
    ),
  [ChoreFormFields.INTERVAL]: yup
    .number()
    .min(1, 'Interwał nie może być mniejszy niż jeden dzień')
    .max(366, 'Interwał nie może być większy niż jeden rok')
    .required('Pole jest wymagane'),
});
