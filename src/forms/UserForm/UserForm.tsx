import { FC } from 'react';
import { Field, FieldProps, Form, useFormikContext } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from '@chakra-ui/react';
import { UserFormFields, UserFormValues } from './userFormValues';

export interface UserFormProps {
  onCancel: () => any;
}

export const UserForm: FC<UserFormProps> = ({ onCancel }) => {
  const { errors, isSubmitting } = useFormikContext<UserFormValues>();

  return (
    <Box
      width="full"
      borderRadius="8px"
      borderColor="gray.300"
      borderWidth="1px"
      padding="4"
      marginBottom="8"
    >
      <Form>
        <Field name={UserFormFields.NAME}>
          {(props: FieldProps<string>) => (
            <FormControl isInvalid={!!errors[UserFormFields.NAME]}>
              <FormLabel htmlFor={UserFormFields.NAME}>Imię i nazwisko</FormLabel>
              <Input id={UserFormFields.NAME} type="text" {...props.field} />
              <FormErrorMessage>{errors[UserFormFields.NAME]}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name={UserFormFields.EMAIL}>
          {(props: FieldProps<string>) => (
            <FormControl isInvalid={!!errors[UserFormFields.EMAIL]}>
              <FormLabel htmlFor={UserFormFields.EMAIL}>Adres e-mail</FormLabel>
              <Input id={UserFormFields.EMAIL} type="email" {...props.field} />
              <FormErrorMessage>{errors[UserFormFields.EMAIL]}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <HStack spacing="2">
          <Button variant="outline" onClick={onCancel}>
            Anuluj
          </Button>
          <Button type="submit" isLoading={isSubmitting} isDisabled={isSubmitting}>
            Edytuj konto
          </Button>
        </HStack>
      </Form>
    </Box>
  );
};
