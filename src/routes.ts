import { compile } from "path-to-regexp";

export const routes = {
  browsePokemons: "/browse",
  pokemonDetails: "/browse/:id",
  about: "/about",
};

export const getPokemonDetailsRoute = (id: string | number) =>
  compile(routes.pokemonDetails)({ id });
