import React from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Container } from '@chakra-ui/react';
import { Redirect, Route, Switch } from 'react-router';
import { HouseholdsList } from './pages/HouseholdsList/HouseholdsList';
import { routes } from './routes';
import { HouseholdDetails } from './pages/HouseholdDetails/HouseholdDetails';
import { HouseholdCreator } from './pages/HouseholdCreator/HouseholdCreator';
import { HouseholdEditor } from './pages/HouseholdEditor/HouseholdEditor';

function App() {
  return (
    <>
      <NavBar />
      <Container maxW="container.xl" marginTop="36" marginBottom="24">
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
          <Route exact path={routes.householdEditor}>
            <HouseholdEditor />
          </Route>
          <Redirect to={routes.householdsList} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
