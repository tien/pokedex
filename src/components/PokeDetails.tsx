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
      ({
        abilities,
        evolutionChain,
        height,
        loading = false,
        moves,
        name,
        sprites,
        stats,
        types,
        weight
      }: IPokeDetailsState) =>
        this.setState({
          abilities,
          evolutionChain,
          height,
          loading,
          moves,
          name,
          sprites,
          stats,
          types,
          weight
        })
    );
  }

  public render() {
    return <div>{this.state.name}</div>;
  }
}

export default PokeDetails;
