import React from 'react';
import {NavBar} from "./components/NavBar/NavBar";
import {Container} from "@chakra-ui/react";
import {Redirect, Route, Switch} from "react-router";
import {HouseholdsListPage} from "./pages/HouseholdsList/HouseholdsListPage";
import { SettingsPage } from './pages/Settings/SettingsPage';
import {routes} from "./routes";

function App() {
  return (
    <>
      <NavBar/>
      <Container maxW="container.xl" marginTop="36">
        <Switch>
          <Route exact path={routes.householdsList}>
            <HouseholdsListPage />
          </Route>
          <Route exact path={routes.settings}>
            <SettingsPage/>
          </Route>
          <Redirect to={routes.householdsList} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
