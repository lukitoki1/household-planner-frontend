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
import { HouseholdMemberFormFields, HouseholdMemberFormValues } from './householdMemberFormValues';
import { BiUserPlus } from 'react-icons/all';

export const HouseholdMemberForm: FC = () => {
  const { isSubmitting, errors } = useFormikContext<HouseholdMemberFormValues>();

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
        <Field name={HouseholdMemberFormFields.EMAIL}>
          {(props: FieldProps<string>) => (
            <FormControl isInvalid={!!errors[HouseholdMemberFormFields.EMAIL]}>
              <FormLabel htmlFor={HouseholdMemberFormFields.EMAIL}>
                Adres e-mail użytkownika
              </FormLabel>
              <HStack>
                <Input id={HouseholdMemberFormFields.EMAIL} type="email" {...props.field} />
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  leftIcon={<BiUserPlus />}
                >
                  Dodaj
                </Button>
              </HStack>
              <FormErrorMessage>{errors[HouseholdMemberFormFields.EMAIL]}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Form>
    </Box>
  );
};
