import { FC } from 'react';
import { UserFormValues } from '../../forms/UserForm/userFormValues';
import { useAuth } from '../../store/auth/authHooks';
import { Formik, FormikHelpers } from 'formik';
import { useHistory } from 'react-router';
import { useAppToast } from '../../components/Toast/useToast';
import { editUserValidationSchema } from '../../forms/UserForm/userFormValidation';
import { UserForm } from '../../forms/UserForm/UserForm';
import { routes } from '../../routes';
import { userService } from '../../api/services/UserService';
import { Text } from '@chakra-ui/react';

export const UserEditor: FC = () => {
  const { user, setUser } = useAuth();
  const { triggerToast } = useAppToast();

  const history = useHistory();

  if (!user) {
    return null;
  }

  const initialValues: UserFormValues = {
    name: user.name,
    email: user.email,
  };

  const onCancel = () => {
    history.push(routes.default);
  };

  const onSubmit = async (values: UserFormValues, actions: FormikHelpers<UserFormValues>) => {
    try {
      await userService.updateUser(user.id, values);
      setUser({ ...user, ...values });

      triggerToast({
        title: 'Zaktualizowano dane użytkownika',
        description: 'Pomyślnie zaktualizowano dane użytkownika',
        status: 'success',
      });

      actions.setSubmitting(false);
      history.push(routes.default);
    } catch {}
  };

  return (
    <>
      <Text fontSize="4xl">Edytuj konto</Text>
      <Text paddingLeft="1" fontSize="md" color="gray.500" marginBottom="8">
        Konto użytkownika #{user.id}
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={editUserValidationSchema}
        onSubmit={onSubmit}
      >
        <UserForm onCancel={onCancel} />
      </Formik>
    </>
  );
};
