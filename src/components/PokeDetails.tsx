import * as React from "react";
import PokeService from "../services/pokeService";

interface IPokeDetailsProps {
  id: number;
}

interface IPokeDetailsState {
  abilities: [] | null;
  evolutionChain: [] | null;
  height: number | null;
  id: number;
  loading: boolean;
  moves: [] | null;
  name: string | null;
  types: [] | null;
  sprites: string | null;
  stats: [] | null;
  weight: number | null;
}

class PokeDetails extends React.Component<
  IPokeDetailsProps,
  IPokeDetailsState
> {
  constructor(props: IPokeDetailsProps) {
    super(props);
    this.state = {
      abilities: null,
      evolutionChain: null,
      height: null,
      id: this.props.id,
      loading: true,
      moves: null,
      name: null,
      sprites: null,
      stats: null,
      types: null,
      weight: null
    };
  }

  public componentDidMount() {
    PokeService.getPokemonByNameOrId(this.props.id).then(
      (pokemonDetails: any) =>
        this.setState({
          ...pokemonDetails,
          loading: false
        })
    );
  }

  public render() {
    return (
      <div>
        <div>{this.state.name}</div>
        <div>{this.state.id}</div>
        {/* <div>{this.state.abilities}</div> */}
        <div>{this.state.height}</div>
        <div>{this.state.weight}</div>
        <div>{this.state.name}</div>
        {/* <div>{this.state.evolutionChain}</div> */}
        {/* <div>{this.state.moves}</div> */}
        {/* <div>{this.state.stats}</div> */}
        {/* <div>{this.state.types}</div> */}
      </div>
    );
  }
}

export default PokeDetails;
