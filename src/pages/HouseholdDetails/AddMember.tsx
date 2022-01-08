import { FC } from 'react';
import { HouseholdMemberForm } from '../../forms/HouseholdMemberForm/HouseholdMemberForm';
import { Formik, FormikHelpers } from 'formik';
import {
  HouseholdMemberFormFields,
  HouseholdMemberFormValues,
} from '../../forms/HouseholdMemberForm/householdMemberFormValues';
import { householdMemberFormValidationSchema } from '../../forms/HouseholdMemberForm/householdMemberFormValidation';
import { useMutation, useQueryClient } from 'react-query';
import { memberService } from '../../api/services/MemberService';
import { useAppToast } from '../../components/Toast/useToast';
import { Queries } from '../../api/queries';

export interface NewMemberProps {
  householdID: number;
}

export const AddMember: FC<NewMemberProps> = ({ householdID }) => {
  const { triggerToast } = useAppToast();
  const queryClient = useQueryClient();

  const mutation = useMutation((userEmail: string) =>
    memberService.addHouseholdMember(householdID, userEmail),
  );

  const initialValues: HouseholdMemberFormValues = {
    [HouseholdMemberFormFields.EMAIL]: '',
  };

  const onSubmit = async (
    values: HouseholdMemberFormValues,
    actions: FormikHelpers<HouseholdMemberFormValues>,
  ) => {
    try {
      await mutation.mutateAsync(values[HouseholdMemberFormFields.EMAIL]);
      triggerToast({
        title: 'Dodano członka gospodarstwa domowego',
        description: `Pomyślnie dodano użytkownika do gospodarstwa domowego.`,
        status: 'success',
      });
      actions.setSubmitting(false);
      actions.resetForm();
      queryClient.invalidateQueries(Queries.HOUSEHOLD_MEMBERS_LIST);
    } catch {}
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={householdMemberFormValidationSchema}
      onSubmit={onSubmit}
    >
      <HouseholdMemberForm />
    </Formik>
  );
};
