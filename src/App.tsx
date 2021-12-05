import React from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Container } from '@chakra-ui/react';
import { Redirect, Route, Switch } from 'react-router';
import { HouseholdsList } from './pages/HouseholdsList/HouseholdsList';
import { routes } from './routes';
import { HouseholdDetails } from './pages/HouseholdDetails/HouseholdDetails';
import { HouseholdCreator } from './pages/HouseholdCreator/HouseholdCreator';

function App() {
  return (
    <>
      <NavBar />
      <Container maxW="container.xl" marginTop="36">
        <Switch>
          <Route exact path={routes.householdsList}>
            <HouseholdsList />
          </Route>
          <Route exact path={routes.householdCreator}>
            <HouseholdCreator />
          </Route>
          <Route exact path={routes.householdDetails}>
            <HouseholdDetails />
          </Route>
          <Redirect to={routes.householdsList} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
