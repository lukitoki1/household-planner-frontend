import React, { useEffect } from 'react';
import { NavBar } from './components/NavBar/NavBar';
import { Container } from '@chakra-ui/react';
import { Redirect, Route, Switch } from 'react-router';
import { HouseholdsList } from './pages/HouseholdsList/HouseholdsList';
import { routes } from './routes';
import { HouseholdDetails } from './pages/HouseholdDetails/HouseholdDetails';
import { HouseholdCreator } from './pages/HouseholdCreator/HouseholdCreator';
import { HouseholdEditor } from './pages/HouseholdEditor/HouseholdEditor';
import { useAuth } from './store/auth/authHooks';
import { LogIn } from './pages/LogIn/LogIn';
import FirebaseService from './api/services/FirebaseService';
import { UserEditor } from './pages/UserEditor/UserEditor';
import { userService } from './api/services/UserService';
import { ChoreCreator } from './pages/ChoreCreator/ChoreCreator';
import { ChoreDetails } from './pages/ChoreDetails/ChoreDetails';
import { ChoreEditor } from './pages/ChoreEditor/ChoreEditor';

function App() {
  const { isUserSet, setUser, setAuthLoading } = useAuth();

  useEffect(() => {
    setAuthLoading(true);
    FirebaseService.onAuthStateChanged()
      .then(
        (firebaseUser) => {
          if (!firebaseUser.email) {
            throw new Error('E-mail not provided by Google SSO');
          }

          userService.loginOrRegisterUser(firebaseUser.email).then(
            (user) => {
              setUser(user);
            },
            (reason) => {
              console.log(reason);
            },
          );
        },
        (reason) => {
          console.error('User not logged in');
          console.log(reason);
        },
      )
      .finally(() => {
        setAuthLoading(false);
      });
  }, []);

  if (!isUserSet) {
    return (
      <Switch>
        <Route exact path={routes.login}>
          <LogIn />
        </Route>
        <Redirect to={routes.login} />
      </Switch>
    );
  }

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" marginTop="36" marginBottom="24">
        <Switch>
          <Route exact path={routes.userEditor}>
            <UserEditor />
          </Route>
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
          <Route exact path={routes.choreCreator}>
            <ChoreCreator />
          </Route>
          <Route exact path={routes.choreDetails}>
            <ChoreDetails />
          </Route>
          <Route exact path={routes.choreEditor}>
            <ChoreEditor />
          </Route>
          <Redirect to={routes.householdsList} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
