import { FC } from 'react';
import { Field, FieldProps, Form, useFormikContext } from 'formik';
import { HouseholdFormFields, HouseholdFormValues } from './householdFormValues';
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input } from '@chakra-ui/react';

export interface HouseholdFormProps {
  isEditing?: boolean;
  onCancel: () => any;
}

export const HouseholdForm: FC<HouseholdFormProps> = ({ onCancel, isEditing }) => {
  const { isSubmitting, errors } = useFormikContext<HouseholdFormValues>();

  return (
    <Form>
      <Field name={HouseholdFormFields.NAME}>
        {(props: FieldProps<string>) => (
          <FormControl
            isInvalid={!!errors[HouseholdFormFields.NAME]}
            marginBottom="7"
            maxWidth="50vw"
            isRequired
          >
            <FormLabel htmlFor={HouseholdFormFields.NAME}>Nazwa gospodarstwa</FormLabel>
            <Input id={HouseholdFormFields.NAME} type="text" height="12" {...props.field} />
            <FormErrorMessage>{errors[HouseholdFormFields.NAME]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <HStack spacing="2">
        <Button variant="outline" onClick={onCancel}>
          Anuluj
        </Button>
        <Button type="submit" isLoading={isSubmitting} isDisabled={isSubmitting}>
          {isEditing ? 'Edytuj' : 'Utwórz'} gospodarstwo
        </Button>
      </HStack>
    </Form>
  );
};
