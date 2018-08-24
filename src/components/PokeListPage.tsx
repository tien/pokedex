import * as React from "react";
import PokeService from "../services/pokeService";
import PokeCard from "./PokeCard";

interface IPokeListPageState {
  pokemons: [];
  next: string | null;
  prev: string | null;
}

class PokeListPage extends React.Component<{}, IPokeListPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      next: null,
      pokemons: [],
      prev: null
    };
  }

  public componentDidMount() {
    PokeService.getAllPokemon().then((data: any) =>
      this.setState({ pokemons: data })
    );
  }

  public render() {
    return (
      <div id="page-container">
        {this.state.pokemons.map((pokemon: any) => (
          <PokeCard
            key={pokemon.name}
            idNum={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            imageUrl={pokemon.sprites.front_default}
          />
        ))}
      </div>
    );
  }
}

export default PokeListPage;
