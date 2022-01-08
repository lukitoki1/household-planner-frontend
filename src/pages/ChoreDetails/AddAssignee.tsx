import { FC } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { ChoreAssigneeForm } from '../../forms/ChoreAssigneeForm/ChoreAssigneeForm';
import { useAppToast } from '../../components/Toast/useToast';
import { useMutation, useQueryClient } from 'react-query';
import { choreService } from '../../api/services/ChoreService';
import { Queries } from '../../api/queries';
import {
  ChoreAssigneeFormFields,
  ChoreAssigneeFormValues,
} from '../../forms/ChoreAssigneeForm/choreAssigneeValues';
import { choreAssigneeFormValidationSchema } from '../../forms/ChoreAssigneeForm/choreAssigneeValidation';

export interface AddAssigneeProps {
  choreID: number;
}

export const AddAssignee: FC<AddAssigneeProps> = ({ choreID }) => {
  const { triggerToast } = useAppToast();
  const queryClient = useQueryClient();

  const mutation = useMutation((userEmail: string) => choreService.addAssignee(choreID, userEmail));

  const initialValues: ChoreAssigneeFormValues = {
    [ChoreAssigneeFormFields.EMAIL]: '',
  };

  const onSubmit = async (
    values: ChoreAssigneeFormValues,
    actions: FormikHelpers<ChoreAssigneeFormValues>,
  ) => {
    try {
      await mutation.mutateAsync(values[ChoreAssigneeFormFields.EMAIL]);
      triggerToast({
        title: 'Dodano wykonawcę obowiązku domowego',
        description: `Pomyślnie dodano wykonawcę do obowiązku domowego.`,
        status: 'success',
      });
      actions.setSubmitting(false);
      actions.resetForm();
      queryClient.invalidateQueries(Queries.CHORE_DETAILS);
    } catch {}
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={choreAssigneeFormValidationSchema}
      onSubmit={onSubmit}
    >
      <ChoreAssigneeForm />
    </Formik>
  );
};
