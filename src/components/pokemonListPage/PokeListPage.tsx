import * as React from "react";
import * as InfiniteScroll from "react-infinite-scroller";
import PokeService from "../../services/pokeService";
import PokeBall from "./PokeBall";

interface IPokeListPageProps {
  toggleLoading: () => void;
}

interface IPokeListPageState {
  pokemons: any[];
  offset: number;
  next: string | null;
}

class PokeListPage extends React.Component<
  IPokeListPageProps,
  IPokeListPageState
> {
  constructor(props: IPokeListPageProps) {
    super(props);
    this.state = {
      next: null,
      offset: 0,
      pokemons: []
    };
    this.loadPokemons = this.loadPokemons.bind(this);
  }

  public loadPokemons() {
    return PokeService.getAllPokemonWithLimitAndOffset(
      40,
      this.state.offset
    ).then((data: any) => {
      this.setState((prevState: IPokeListPageState) => ({
        next: data.next,
        offset: prevState.offset + 40,
        pokemons: [...prevState.pokemons, ...data.pokemons]
      }));
    });
  }

  public componentDidMount() {
    this.props.toggleLoading();
    this.loadPokemons().then((_: any) => this.props.toggleLoading());
  }

  public render() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadPokemons}
        hasMore={this.state.next ? true : false}
        loader={
          <h2
            className="loader"
            key={0}
            style={{ textAlign: "right", marginRight: "20px" }}>... Loading</h2>
        }>
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
      </InfiniteScroll>
    );
  }
}

export default PokeListPage;
