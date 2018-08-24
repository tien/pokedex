import * as React from "react";
import PokeService from "../services/pokeService";
import PokeCard from "./PokeCard";

interface IPokeListPageProps {
  pokemons: [];
  next: string | null;
  prev: string | null;
}

const PokeListPage = (props: IPokeListPageProps) => (
  <div id=" page-container poke-list-page">
    {PokeService.getAllPokemon().results.map((pokemon: any) => (
      <PokeCard
        key={pokemon.name}
        idNum={pokemon.id}
        name={pokemon.name}
        types={pokemon.types}
        imageUrl={pokemon.sprites.fron_default}
      />
    ))}
  </div>
);

export default PokeListPage;
