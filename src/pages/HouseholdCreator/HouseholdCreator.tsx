import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { Formik, FormikHelpers } from 'formik';
import { HouseholdCreatorForm } from './HouseholdCreatorForm';
import {
  HouseholdCreatorFormFields,
  HouseholdCreatorFormValues,
} from './householdCreatorFormValues';
import { useMutation, useQueryClient } from 'react-query';
import { HouseholdQueries } from '../../api/queries';
import { householdService } from '../../api/services/HouseholdService';
import { householdCreatorFirmValidationSchema } from './householdCreatorFormValidation';
import { useAppToast } from '../../components/Toast/useToast';
import { useHistory } from 'react-router';
import { routes } from '../../routes';

export const HouseholdCreator: FC = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { triggerToast } = useAppToast();

  const mutation = useMutation(householdService.createHousehold, {
    onSettled: () => queryClient.invalidateQueries(HouseholdQueries.HOUSEHOLDS),
  });

  const initialValues: HouseholdCreatorFormValues = {
    [HouseholdCreatorFormFields.NAME]: '',
  };

  const onSubmit = async (
    values: HouseholdCreatorFormValues,
    actions: FormikHelpers<HouseholdCreatorFormValues>,
  ) => {
    try {
      await mutation.mutateAsync({
        name: values[HouseholdCreatorFormFields.NAME],
      });
      triggerToast({
        title: 'Utworzono gospodarstwo domowe',
        description: `Pomyślnie utworzono gospodarstwo domowe ${
          values[HouseholdCreatorFormFields.NAME]
        }`,
        status: 'success',
      });
      actions.setSubmitting(false);
      history.push(routes.householdsList);
    } catch {}
  };

  return (
    <>
      <Text fontSize="4xl" marginBottom="8">
        Nowe gospodarstwo domowe
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={householdCreatorFirmValidationSchema}
        onSubmit={onSubmit}
      >
        <HouseholdCreatorForm />
      </Formik>
    </>
  );
};
