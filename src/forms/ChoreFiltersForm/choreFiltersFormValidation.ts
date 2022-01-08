import * as yup from 'yup';
import { ChoreFiltersFormFields } from './choreFiltersFormValues';
import { CHORE_NAME_MAX } from '../../values';

export const choreFiltersFormValidationSchema = yup.object().shape({
  [ChoreFiltersFormFields.NAME]: yup
    .string()
    .max(CHORE_NAME_MAX, `Nazwa obowiązku domowego nie może przekroczyć ${CHORE_NAME_MAX} znaków`),
  [ChoreFiltersFormFields.INTERVAL]: yup
    .number()
    .min(1, 'Interwał nie może być mniejszy niż jeden dzień')
    .max(366, 'Interwał nie może być większy niż jeden rok'),
});
