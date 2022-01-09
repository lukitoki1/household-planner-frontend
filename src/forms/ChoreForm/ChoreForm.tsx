import { FC } from 'react';
import { Field, FieldProps, Form, useFormikContext } from 'formik';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
  Text,
  IconButton,
  Box,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { ChoreFormFields, ChoreFormValues } from './choreFormValues';
import { languageTranslations } from '../../values';
import { pl } from 'date-fns/locale';
import { BiMinus, BiPlus } from 'react-icons/all';
import { ChoreScheduleDisplay } from '../../components/ChoreScheduleDisplay/ChoreScheduleDisplay';

export interface ChoreFormProps {
  isEditing?: boolean;
  onCancel: () => any;
}

export const ChoreForm: FC<ChoreFormProps> = ({ isEditing, onCancel }) => {
  const { errors, isSubmitting, values, setFieldValue } = useFormikContext<ChoreFormValues>();

  const languageEntries = Object.entries(languageTranslations);

  return (
    <Form>
      <Field name={ChoreFormFields.NAME}>
        {(props: FieldProps<string>) => (
          <FormControl maxWidth="50vw" isInvalid={!!errors[ChoreFormFields.NAME]} marginBottom="8">
            <FormLabel htmlFor={ChoreFormFields.NAME}>Nazwa</FormLabel>
            <Input id={ChoreFormFields.NAME} type="text" {...props.field} />
            <FormErrorMessage>{errors[ChoreFormFields.NAME]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name={ChoreFormFields.DESCRIPTION}>
        {(props: FieldProps<string>) => (
          <FormControl isInvalid={!!errors[ChoreFormFields.DESCRIPTION]} marginBottom="2">
            <FormLabel htmlFor={ChoreFormFields.DESCRIPTION}>Opis</FormLabel>
            <Textarea id={ChoreFormFields.DESCRIPTION} {...props.field} />
            <FormErrorMessage>{errors[ChoreFormFields.DESCRIPTION]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name={ChoreFormFields.DESCRIPTION_LANGUAGE}>
        {(props: FieldProps<string>) => (
          <FormControl isInvalid={!!errors[ChoreFormFields.DESCRIPTION_LANGUAGE]} marginBottom="8">
            <HStack spacing="2">
              <Text>Język opisu:</Text>
              <Select id={ChoreFormFields.DESCRIPTION_LANGUAGE} width="auto" {...props.field}>
                {languageEntries.map((entry) => (
                  <option key={entry[0]} value={entry[0]}>
                    {entry[1]}
                  </option>
                ))}
              </Select>
            </HStack>
          </FormControl>
        )}
      </Field>
      <FormLabel>Data rozpoczęcia i godzina występowania</FormLabel>
      <DatePicker
        selected={values[ChoreFormFields.START_DATE]}
        onChange={(date) => setFieldValue(ChoreFormFields.START_DATE, date || new Date())}
        dateFormat="dd.MM.yyyy HH:mm"
        timeFormat="HH:mm"
        timeCaption="Godzina"
        minDate={new Date()}
        locale={pl}
        customInput={<Input maxWidth="376px" marginBottom="8" />}
        timeIntervals={15}
        popperModifiers={[
          {
            name: 'arrow',
            options: {
              padding: 20,
            },
          },
        ]}
        showTimeSelect
      />
      <Field name={ChoreFormFields.INTERVAL}>
        {(props: FieldProps<number>) => (
          <FormControl
            maxWidth="50vw"
            isInvalid={!!errors[ChoreFormFields.INTERVAL]}
            marginBottom="8"
          >
            <FormLabel htmlFor={ChoreFormFields.INTERVAL}>Interwał występowania</FormLabel>
            <HStack spacing="2">
              <Input id={ChoreFormFields.INTERVAL} type="number" {...props.field} maxWidth="32" />
              <IconButton
                aria-label="Decrement"
                onClick={() =>
                  setFieldValue(ChoreFormFields.INTERVAL, values[ChoreFormFields.INTERVAL] - 1)
                }
              >
                <BiMinus />
              </IconButton>
              <IconButton
                aria-label="Increment"
                onClick={() =>
                  setFieldValue(ChoreFormFields.INTERVAL, values[ChoreFormFields.INTERVAL] + 1)
                }
              >
                <BiPlus />
              </IconButton>
              <Text>dni</Text>
            </HStack>
            <FormErrorMessage>{errors[ChoreFormFields.INTERVAL]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Box marginBottom="12">
        <ChoreScheduleDisplay
          startDate={values[ChoreFormFields.START_DATE]}
          intervalDays={values[ChoreFormFields.INTERVAL]}
          isItalic
        />
      </Box>
      <HStack spacing="2">
        <Button variant="outline" onClick={onCancel}>
          Anuluj
        </Button>
        <Button type="submit" isLoading={isSubmitting} isDisabled={isSubmitting}>
          {isEditing ? 'Edytuj' : 'Utwórz'} obowiązek
        </Button>
      </HStack>
    </Form>
  );
};
