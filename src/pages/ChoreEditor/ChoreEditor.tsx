import { FC } from 'react';
import { useAppToast } from '../../components/Toast/useToast';
import { useHistory, useParams } from 'react-router';
import { CHORE_ID_PARAM, ChoreEditorParams, routes } from '../../routes';
import { useMutation, useQuery } from 'react-query';
import { EditChoreRequest } from '../../api/dto';
import { choreService } from '../../api/services/ChoreService';
import { ChoreFormFields, ChoreFormValues } from '../../forms/ChoreForm/choreFormValues';
import { replaceParam } from '../../helpers/url';
import { Formik, FormikHelpers } from 'formik';
import { Center, Spinner, Text } from '@chakra-ui/react';
import { choreFormValidationSchema } from '../../forms/ChoreForm/choreFormValidation';
import { ChoreForm } from '../../forms/ChoreForm/ChoreForm';
import { Queries } from '../../api/queries';

export const ChoreEditor: FC = () => {
  const history = useHistory();
  const { triggerToast } = useAppToast();

  const { choreID } = useParams<ChoreEditorParams>();
  const id = parseInt(choreID);

  const mutation = useMutation((payload: EditChoreRequest) =>
    choreService.updateChore(id, payload),
  );

  const { data, isLoading, isError } = useQuery(Queries.CHORE_DETAILS, () =>
    choreService.getChoreDetails(id),
  );

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (isError || !data) {
    return <Center>Podczas pobierania szczegółów obowiązku domowego wystąpił błąd.</Center>;
  }

  const initialValues: ChoreFormValues = {
    [ChoreFormFields.NAME]: data.name,
    [ChoreFormFields.DESCRIPTION]: data.description,
    [ChoreFormFields.DESCRIPTION_LANGUAGE]: data.language,
    [ChoreFormFields.START_DATE]: new Date(data.startDate),
    [ChoreFormFields.INTERVAL]: data.intervalDays,
  };

  const onCancel = () => {
    history.push(replaceParam(routes.choreDetails, CHORE_ID_PARAM, choreID));
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
        title: 'Edytowano obowiązek domowy',
        description: `Pomyślnie edytowano obowiązek domowy ${values[ChoreFormFields.NAME]}`,
        status: 'success',
      });
      actions.setSubmitting(false);
      history.push(replaceParam(routes.choreDetails, CHORE_ID_PARAM, choreID));
    } catch {}
  };

  return (
    <>
      <Text fontSize="4xl">Edytuj obowiązek domowy</Text>
      <Text paddingLeft="1" fontSize="md" color="gray.500" marginBottom="8">
        Obowiązek #{choreID}
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
