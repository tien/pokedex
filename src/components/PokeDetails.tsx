import * as React from "react";
import PokeService from "../services/pokeService";

interface IPokeDetailsProps {
  abilities: [];
  evolutionChain: [];
  height: number;
  id: number;
  moves: [];
  name: string;
  types: [];
  sprites: string;
  stats: [];
  weight: number;
}

class PokeDetails extends React.Component<IPokeDetailsProps, {}> {
  constructor(props: IPokeDetailsProps) {
    super(props);
    this.state = {
      abilities: this.props.abilities,
      evolutionChain: this.props.evolutionChain,
      height: this.props.height,
      id: this.props.id,
      moves: this.props.moves,
      name: this.props.name,
      sprites: this.props.sprites,
      stats: this.props.stats,
      types: this.props.types,
      weight: this.props.weight
    };
  }

  public render() {
    return { ...this.props };
  }
}

export default PokeDetails;
