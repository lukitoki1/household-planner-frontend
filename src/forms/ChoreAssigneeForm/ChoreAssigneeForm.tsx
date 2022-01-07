import { FC } from 'react';
import { Button, FormControl, FormErrorMessage, HStack, Input } from '@chakra-ui/react';
import { Field, FieldProps, Form, useFormikContext } from 'formik';
import { BiUserPlus } from 'react-icons/all';
import { ChoreAssigneeFormFields, ChoreAssigneeFormValues } from './choreAssigneeValues';

export const ChoreAssigneeForm: FC = () => {
  const { isSubmitting, errors } = useFormikContext<ChoreAssigneeFormValues>();

  return (
    <Form>
      <Field name={ChoreAssigneeFormFields.EMAIL}>
        {(props: FieldProps<string>) => (
          <FormControl isInvalid={!!errors[ChoreAssigneeFormFields.EMAIL]}>
            <HStack>
              <Input
                placeholder="Adres e-mail nowego wykonawcy"
                id={ChoreAssigneeFormFields.EMAIL}
                type="email"
                {...props.field}
              />
              <Button
                type="submit"
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                leftIcon={<BiUserPlus />}
                paddingX="8"
              >
                Przypisz
              </Button>
            </HStack>
            <FormErrorMessage>{errors[ChoreAssigneeFormFields.EMAIL]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Form>
  );
};
