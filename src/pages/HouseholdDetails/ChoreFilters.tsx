import { Formik, FormikHelpers } from 'formik';
import { FC } from 'react';
import { ChoreFilterParams } from '../../api/dto';
import { ChoreFiltersForm } from '../../forms/ChoreFiltersForm/ChoreFIltersForm';
import {
  ChoreFiltersFormFields,
  ChoreFiltersFormValues,
} from '../../forms/ChoreFiltersForm/choreFiltersFormValues';
import { choreFiltersFormValidationSchema } from '../../forms/ChoreFiltersForm/choreFiltersFormValidation';

export interface ChoreFiltersProps {
  onFiltersChange: (filters: ChoreFilterParams) => void;
}

export const ChoreFilters: FC<ChoreFiltersProps> = ({ onFiltersChange }) => {
  const initialValues: ChoreFiltersFormValues = {
    [ChoreFiltersFormFields.NAME]: '',
    [ChoreFiltersFormFields.INTERVAL]: '',
  };

  const onSubmit = (
    values: ChoreFiltersFormValues,
    actions: FormikHelpers<ChoreFiltersFormValues>,
  ) => {
    onFiltersChange({
      name: values[ChoreFiltersFormFields.NAME] || undefined,
      interval:
        values[ChoreFiltersFormFields.INTERVAL] === ''
          ? undefined
          : parseInt(values[ChoreFiltersFormFields.INTERVAL]),
    });
    actions.setSubmitting(false);
  };

  const onReset = () => {
    console.log('aaa');
    onFiltersChange({});
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={choreFiltersFormValidationSchema}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <ChoreFiltersForm />
    </Formik>
  );
};
