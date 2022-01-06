import { FC } from 'react';
import { useHistory, useParams } from 'react-router';
import { useMutation, useQuery } from 'react-query';
import { useAppToast } from '../../components/Toast/useToast';
import { householdService } from '../../api/services/HouseholdService';
import { Queries } from '../../api/queries';
import {
  HouseholdFormFields,
  HouseholdFormValues,
} from '../../forms/HouseholdForm/householdFormValues';
import { Formik, FormikHelpers } from 'formik';
import { HOUSEHOLD_ID_PARAM, HouseholdEditorParams, routes } from '../../routes';
import { Center, Spinner, Text } from '@chakra-ui/react';
import { householdFormValidationSchema } from '../../forms/HouseholdForm/householdFormValidation';
import { HouseholdForm } from '../../forms/HouseholdForm/HouseholdForm';
import { EditHouseholdRequest } from '../../api/dto';
import { replaceParam } from '../../helpers/url';

export const HouseholdEditor: FC = () => {
  const history = useHistory();
  const { triggerToast } = useAppToast();

  const { householdID } = useParams<HouseholdEditorParams>();
  const id = Number.parseInt(householdID);

  const mutation = useMutation((payload: EditHouseholdRequest) =>
    householdService.updateHousehold(id, payload),
  );

  const { data, isLoading } = useQuery(Queries.HOUSEHOLD_DETAILS, () =>
    householdService.getHouseholdDetails(id),
  );

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (!data) {
    return <Center>Wystąpił błąd.</Center>;
  }

  const initialValues: HouseholdFormValues = {
    [HouseholdFormFields.NAME]: data.name,
  };

  const onCancel = () => {
    history.push(replaceParam(routes.householdDetails, HOUSEHOLD_ID_PARAM, householdID));
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
        title: 'Edytowano gospodarstwo domowe',
        description: `Pomyślnie edytowano gospodarstwo domowe ${values[HouseholdFormFields.NAME]}`,
        status: 'success',
      });
      actions.setSubmitting(false);
      history.push(replaceParam(routes.householdDetails, HOUSEHOLD_ID_PARAM, householdID));
    } catch {}
  };

  return (
    <>
      <Text fontSize="4xl">Edytuj gospodarstwo domowe</Text>
      <Text paddingLeft="1" fontSize="md" color="gray.500" marginBottom="8">
        Gospodarstwo #{householdID}
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={householdFormValidationSchema}
        onSubmit={onSubmit}
      >
        <HouseholdForm onCancel={onCancel} isEditing />
      </Formik>
    </>
  );
};
