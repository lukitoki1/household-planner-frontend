import { FC, useState } from 'react';
import { ChoreDTO } from '../../api/dto';
import { Center, HStack, Select, Spinner, Text } from '@chakra-ui/react';
import { languageTranslations } from '../../values';
import { useQuery } from 'react-query';
import { Queries } from '../../api/queries';
import { choreService } from '../../api/services/ChoreService';

export interface ChoreDescriptionProps {
  chore: ChoreDTO;
}

export const ChoreDescription: FC<ChoreDescriptionProps> = ({ chore }) => {
  const [language, setLanguage] = useState<string>(chore.language);

  const languageEntries = Object.entries(languageTranslations).map(([key, value]) => [
    key,
    key === chore.language ? value + ' (język oryginalny)' : value,
  ]);

  const { data, isLoading, isError } = useQuery(
    [Queries.CHORE_DESCRIPTION, chore.id, language],
    () => choreService.getChoreDescription(chore.id, language),
  );

  let description;

  if (isLoading) {
    description = (
      <Center>
        <Spinner />
      </Center>
    );
  } else if (isError || !data) {
    description = chore.description;
  } else {
    description = data;
  }

  return (
    <>
      <Text fontSize="2xl" marginBottom="8">
        Opis
      </Text>
      <HStack spacing="2" marginBottom="8">
        <Text>Język: </Text>
        <Select
          width="auto"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          {languageEntries.map((entry) => (
            <option key={entry[0]} value={entry[0]}>
              {entry[1]}
            </option>
          ))}
        </Select>
      </HStack>
      {description}
    </>
  );
};
