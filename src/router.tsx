import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import About from "./components/About";
import PokeListPage from "./components/pokemonListPage/PokeListPage";
import { routes } from "./routes";

export const pokemonBrowsePath = "browse";

const Router = () => (
  <Switch>
    <Redirect exact={true} from="/" to={routes.browsePokemons} />
    <Route
      exact={true}
      path={[routes.browsePokemons, routes.pokemonDetails]}
      component={PokeListPage}
    />
    <Route exact={true} path={routes.about} component={About} />
  </Switch>
);

export default Router;
