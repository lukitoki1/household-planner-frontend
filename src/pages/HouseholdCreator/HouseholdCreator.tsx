import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { Formik, FormikHelpers } from 'formik';
import { useMutation } from 'react-query';
import { householdService } from '../../api/services/HouseholdService';
import { useAppToast } from '../../components/Toast/useToast';
import { useHistory } from 'react-router';
import { routes } from '../../routes';
import {
  HouseholdFormFields,
  HouseholdFormValues,
} from '../../forms/HouseholdForm/householdFormValues';
import { householdFormValidationSchema } from '../../forms/HouseholdForm/householdFormValidation';
import { HouseholdForm } from '../../forms/HouseholdForm/HouseholdForm';

export const HouseholdCreator: FC = () => {
  const history = useHistory();
  const { triggerToast } = useAppToast();

  const mutation = useMutation(householdService.createHousehold);

  const initialValues: HouseholdFormValues = {
    [HouseholdFormFields.NAME]: '',
  };

  const onCancel = () => {
    history.push(routes.householdsList);
  };

  const onSubmit = async (
    values: HouseholdFormValues,
    actions: FormikHelpers<HouseholdFormValues>,
  ) => {
    try {
      await mutation.mutateAsync({
        name: values[HouseholdFormFields.NAME],
      });
      triggerToast({
        title: 'Utworzono gospodarstwo domowe',
        description: `Pomyślnie utworzono gospodarstwo domowe ${values[HouseholdFormFields.NAME]}`,
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
        validationSchema={householdFormValidationSchema}
        onSubmit={onSubmit}
      >
        <HouseholdForm onCancel={onCancel} />
      </Formik>
    </>
  );
};
