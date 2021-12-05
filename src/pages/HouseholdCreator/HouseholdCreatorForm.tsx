import { FC } from 'react';
import { Field, FieldProps, Form, useFormikContext } from 'formik';
import {
  HouseholdCreatorFormFields,
  HouseholdCreatorFormValues,
} from './householdCreatorFormValues';
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { routes } from '../../routes';

export const HouseholdCreatorForm: FC = () => {
  const history = useHistory();
  const { isSubmitting, errors } = useFormikContext<HouseholdCreatorFormValues>();

  const redirectToHouseholdsList = () => {
    history.push(routes.householdsList);
  };

  return (
    <Form>
      <Field name={HouseholdCreatorFormFields.NAME}>
        {(props: FieldProps<string>) => (
          <FormControl
            isInvalid={!!errors[HouseholdCreatorFormFields.NAME]}
            marginBottom="7"
            maxWidth="50vw"
            isRequired
          >
            <FormLabel htmlFor={HouseholdCreatorFormFields.NAME}>Nazwa gospodarstwa</FormLabel>
            <Input id={HouseholdCreatorFormFields.NAME} type="text" height="12" {...props.field} />
            <FormErrorMessage>{errors[HouseholdCreatorFormFields.NAME]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <HStack spacing="2">
        <Button variant="outline" onClick={redirectToHouseholdsList}>
          Anuluj
        </Button>
        <Button type="submit" isLoading={isSubmitting} isDisabled={isSubmitting}>
          Utwórz gospodarstwo
        </Button>
      </HStack>
    </Form>
  );
};
