import * as React from "react";
import PokeService from "../../services/pokeService";
import PokeBall from "./PokeBall";

interface IPokeListPageProps {
  toggleLoading: () => void;
}

interface IPokeListPageState {
  pokemons: [];
  next: string | null;
  prev: string | null;
}

class PokeListPage extends React.Component<
  IPokeListPageProps,
  IPokeListPageState
> {
  constructor(props: IPokeListPageProps) {
    super(props);
    this.state = {
      next: null,
      pokemons: [],
      prev: null
    };
  }

  public componentDidMount() {
    this.props.toggleLoading();
    PokeService.getAllPokemonWithLimitAndOffset(39, 0).then((data: any) => {
      this.props.toggleLoading();
      this.setState({ pokemons: data });
    });
  }

  public render() {
    return (
      <div id="page-container" className="grid-on-lg">
        {this.state.pokemons.map((pokemon: any) => (
          <PokeBall
            key={pokemon.name}
            idNum={pokemon.id}
            name={pokemon.name}
            imageUrl={pokemon.imageUrl}
          />
        ))}
      </div>
    );
  }
}

export default PokeListPage;
