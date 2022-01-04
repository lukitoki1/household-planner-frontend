import { ChoreDTO, UserDTO } from '../../api/dto';

export const choreMocks: ChoreDTO[] = [
  {
    id: 1,
    name: 'Mycie podłogi',
    description: 'Mycie podłogi mopem',
    user: {
      id: '1',
      name: 'Arkadiusz Michalak',
      email: 'amichalak@op.pl',
    },
    household: {
      id: 1,
      name: 'Świetny dom',
    },
    nextOccurrence: '2021-12-07T15:46:03.023Z',
  },
  {
    id: 2,
    name: 'Pranie',
    description: 'Mycie podłogi mopem',
    household: {
      id: 1,
      name: 'Świetny dom',
    },
    nextOccurrence: '2021-12-07T15:46:03.023Z',
  },
  {
    id: 3,
    name: 'Odkurzanie',
    description: 'Mycie podłogi mopem',
    user: {
      id: '1',
      name: 'Arkadiusz Michalak',
      email: 'amichalak@op.pl',
    },
    household: {
      id: 1,
      name: 'Świetny dom',
    },
    nextOccurrence: '2021-12-07T15:46:03.023Z',
  },
];

export const memberMocks: UserDTO[] = [
  { id: '1', name: 'Łukasz Kamiński', email: 'lukasz.kaminski@mail.com' },
  { id: '2', name: 'Łukasz Kamiński', email: 'lukasz.kaminski@mail.com' },
  { id: '3', name: 'Łukasz Kamiński', email: 'lukasz.kaminski@mail.com' },
];
