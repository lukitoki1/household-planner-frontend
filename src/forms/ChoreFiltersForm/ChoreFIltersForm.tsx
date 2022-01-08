import { FC } from 'react';
import { Field, FieldProps, Form, useFormikContext } from 'formik';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  IconButton,
  Box,
  Flex,
} from '@chakra-ui/react';
import { BiMinus, BiPlus, BiSearch } from 'react-icons/all';
import { ChoreFiltersFormFields, ChoreFiltersFormValues } from './choreFiltersFormValues';

export interface ChoreFiltersFormProps {
  isLoading?: boolean;
}

export const ChoreFiltersForm: FC<ChoreFiltersFormProps> = ({ isLoading }) => {
  const { errors, values, setFieldValue, handleReset } = useFormikContext<ChoreFiltersFormValues>();

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
        <Flex justify="space-between">
          <HStack spacing="2" alignItems="start">
            <Field name={ChoreFiltersFormFields.NAME}>
              {(props: FieldProps<string>) => (
                <FormControl minWidth="440px" isInvalid={!!errors[ChoreFiltersFormFields.NAME]}>
                  <FormLabel htmlFor={ChoreFiltersFormFields.NAME}>Nazwa</FormLabel>
                  <Input id={ChoreFiltersFormFields.NAME} type="text" {...props.field} />
                  <FormErrorMessage>{errors[ChoreFiltersFormFields.NAME]}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name={ChoreFiltersFormFields.INTERVAL}>
              {(props: FieldProps<number>) => (
                <FormControl minWidth="200px" isInvalid={!!errors[ChoreFiltersFormFields.INTERVAL]}>
                  <FormLabel htmlFor={ChoreFiltersFormFields.INTERVAL}>Interwał</FormLabel>
                  <HStack spacing="2">
                    <Input
                      id={ChoreFiltersFormFields.INTERVAL}
                      type="number"
                      {...props.field}
                      maxWidth="32"
                    />
                    <IconButton
                      aria-label="Decrement"
                      onClick={() =>
                        setFieldValue(
                          ChoreFiltersFormFields.INTERVAL,
                          (parseInt(values[ChoreFiltersFormFields.INTERVAL] || '0') - 1).toString(),
                        )
                      }
                    >
                      <BiMinus />
                    </IconButton>
                    <IconButton
                      aria-label="Increment"
                      onClick={() =>
                        setFieldValue(
                          ChoreFiltersFormFields.INTERVAL,
                          (parseInt(values[ChoreFiltersFormFields.INTERVAL] || '0') + 1).toString(),
                        )
                      }
                    >
                      <BiPlus />
                    </IconButton>
                    <Text>dni</Text>
                  </HStack>
                  <FormErrorMessage>{errors[ChoreFiltersFormFields.INTERVAL]}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </HStack>
          <HStack spacing="2">
            <Button variant="ghost" onClick={handleReset}>
              Wyczyść
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              isDisabled={isLoading}
              rightIcon={<BiSearch />}
            >
              Filtruj
            </Button>
          </HStack>
        </Flex>
      </Form>
    </Box>
  );
};
