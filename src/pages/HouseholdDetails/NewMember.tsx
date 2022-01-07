import { FC } from 'react';
import { NewMemberForm } from '../../forms/NewMemberForm/NewMemberForm';
import { Formik, FormikHelpers } from 'formik';
import {
  NewMemberFormFields,
  NewMemberFormValues,
} from '../../forms/NewMemberForm/newMemberFormValues';
import { newMemberFormValidationSchema } from '../../forms/NewMemberForm/newMemberFormValidation';
import { useMutation, useQueryClient } from 'react-query';
import { memberService } from '../../api/services/MemberService';
import { useAppToast } from '../../components/Toast/useToast';
import { Queries } from '../../api/queries';

export interface NewMemberProps {
  householdID: number;
}

export const NewMember: FC<NewMemberProps> = ({ householdID }) => {
  const { triggerToast } = useAppToast();
  const queryClient = useQueryClient();

  const mutation = useMutation((userEmail: string) =>
    memberService.addHouseholdMember(householdID, userEmail),
  );

  const initialValues: NewMemberFormValues = {
    [NewMemberFormFields.EMAIL]: '',
  };

  const onSubmit = async (
    values: NewMemberFormValues,
    actions: FormikHelpers<NewMemberFormValues>,
  ) => {
    try {
      await mutation.mutateAsync(values[NewMemberFormFields.EMAIL]);
      triggerToast({
        title: 'Dodano członka gospodarstwa domowego',
        description: `Pomyślnie dodano użytkownika do gospodarstwa domowego.`,
        status: 'success',
      });
      actions.setSubmitting(false);
      queryClient.invalidateQueries(Queries.HOUSEHOLD_MEMBERS_LIST);
    } catch {}
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={newMemberFormValidationSchema}
      onSubmit={onSubmit}
    >
      <NewMemberForm />
    </Formik>
  );
};
