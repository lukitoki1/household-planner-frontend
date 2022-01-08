import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { Formik, FormikHelpers } from 'formik';
import { useHistory, useLocation } from 'react-router';
import { ChoreCreatorRouterState, HOUSEHOLD_ID_PARAM, routes } from '../../routes';
import { ChoreForm } from '../../forms/ChoreForm/ChoreForm';
import { replaceParam } from '../../helpers/url';
import { ChoreFormFields, ChoreFormValues } from '../../forms/ChoreForm/choreFormValues';
import { languageTranslations } from '../../values';
import { useMutation } from 'react-query';
import { choreService } from '../../api/services/ChoreService';
import { EditChoreRequest } from '../../api/dto';
import { useAppToast } from '../../components/Toast/useToast';
import { choreFormValidationSchema } from '../../forms/ChoreForm/choreFormValidation';

export const ChoreCreator: FC = () => {
  const { triggerToast } = useAppToast();

  const history = useHistory();
  const location = useLocation<ChoreCreatorRouterState>();
  const householdID = location.state.householdID;

  const mutation = useMutation((payload: EditChoreRequest) =>
    choreService.createHouseholdChore(parseInt(householdID), payload),
  );

  const initialValues: ChoreFormValues = {
    [ChoreFormFields.NAME]: '',
    [ChoreFormFields.DESCRIPTION]: '',
    [ChoreFormFields.DESCRIPTION_LANGUAGE]: Object.keys(languageTranslations)[0],
    [ChoreFormFields.START_DATE]: new Date(),
    [ChoreFormFields.INTERVAL]: 7,
  };

  const onCancel = () => {
    history.push(replaceParam(routes.householdDetails, HOUSEHOLD_ID_PARAM, householdID));
  };

  const onSubmit = async (values: ChoreFormValues, actions: FormikHelpers<ChoreFormValues>) => {
    try {
      await mutation.mutateAsync({
        name: values[ChoreFormFields.NAME],
        description: values[ChoreFormFields.DESCRIPTION],
        language: values[ChoreFormFields.DESCRIPTION_LANGUAGE],
        startDate: values[ChoreFormFields.START_DATE].toISOString(),
        intervalDays: values[ChoreFormFields.INTERVAL],
      });
      triggerToast({
        title: 'Utworzono obowiązek domowy',
        description: `Pomyślnie utworzono obowiązek domowy ${values[ChoreFormFields.NAME]}`,
        status: 'success',
      });
      actions.setSubmitting(false);
      history.push(replaceParam(routes.householdDetails, HOUSEHOLD_ID_PARAM, householdID));
    } catch {}
  };

  return (
    <>
      <Text fontSize="4xl">Nowy obowiązek domowy</Text>
      <Text paddingLeft="1" fontSize="md" color="gray.500" marginBottom="8">
        Nowy obowiązek w gospodarstwie #{householdID}
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={choreFormValidationSchema}
        onSubmit={onSubmit}
      >
        <ChoreForm onCancel={onCancel} />
      </Formik>
    </>
  );
};
