import { FC } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, useFormikContext } from 'formik';
import { NewMemberFormFields, NewMemberFormValues } from './newMemberFormValues';
import { BiUserPlus } from 'react-icons/all';

export const NewMemberForm: FC = () => {
  const { isSubmitting, errors } = useFormikContext<NewMemberFormValues>();

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
        <Field name={NewMemberFormFields.EMAIL}>
          {(props: FieldProps<string>) => (
            <FormControl isInvalid={!!errors[NewMemberFormFields.EMAIL]}>
              <FormLabel htmlFor={NewMemberFormFields.EMAIL}>Adres e-mail użytkownika</FormLabel>
              <HStack>
                <Input id={NewMemberFormFields.EMAIL} type="email" {...props.field} />
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  leftIcon={<BiUserPlus />}
                >
                  Dodaj
                </Button>
              </HStack>
              <FormErrorMessage>{errors[NewMemberFormFields.EMAIL]}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Form>
    </Box>
  );
};
