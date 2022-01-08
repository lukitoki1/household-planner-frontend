import { FC } from 'react';
import { Box, Link, Text, VStack } from '@chakra-ui/react';
import { formatDateTime } from '../../helpers/time';
import { ChoreDTO } from '../../api/dto';
import { Link as ReactLink } from 'react-router-dom';
import { replaceParam } from '../../helpers/url';
import { HOUSEHOLD_ID_PARAM, routes } from '../../routes';
import { ChoreAssignee } from './ChoreAssignee';

export interface ChoreInfoProps {
  chore: ChoreDTO;
}

export const ChoreInfoBox: FC = ({ children }) => (
  <Box borderRadius="8px" borderColor="gray.300" borderWidth="1px" padding="4" width="full">
    {children}
  </Box>
);

export const ChoreInfo: FC<ChoreInfoProps> = ({ chore }) => {
  return (
    <Box>
      <Text fontSize="2xl" marginBottom="8">
        Podstawowe informacje
      </Text>
      <VStack spacing="4">
        <ChoreInfoBox>
          <b>Gospodarstwo domowe: </b>
          <Link
            as={ReactLink}
            to={replaceParam(
              routes.householdDetails,
              HOUSEHOLD_ID_PARAM,
              chore.household.id.toString(),
            )}
            color="blue.500"
          >
            {chore.household.name}
          </Link>
        </ChoreInfoBox>
        <ChoreInfoBox>
          <b>Harmonogram: </b>
          {chore.intervalDays === 1 ? 'Codziennie ' : `Co ${chore.intervalDays} dni `}
          od {formatDateTime(new Date(chore.startDate))}
        </ChoreInfoBox>
        <ChoreInfoBox>
          <b>Następne wystąpienie: </b>
          {formatDateTime(new Date(chore.nextOccurence))}
        </ChoreInfoBox>
        <ChoreAssignee chore={chore} />
      </VStack>
    </Box>
  );
};
