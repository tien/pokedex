import * as React from "react";
import * as InfiniteScroll from "react-infinite-scroller";
import PokeService from "../../services/pokeService";
import "../../styles/PokeListPage.css";
import PokeBall from "./PokeBall";

interface IPokeListPageProps {
  toggleLoading: () => void;
}

interface IPokeListPageState {
  next: boolean;
  offset: number;
  pokemons: any[];
  searchQuery: string;
}

class PokeListPage extends React.Component<
  IPokeListPageProps,
  IPokeListPageState
> {
  constructor(props: IPokeListPageProps) {
    super(props);
    this.state = {
      next: true,
      offset: 0,
      pokemons: [],
      searchQuery: ""
    };
    this.loadPokemons = this.loadPokemons.bind(this);
    this.searchPokemons = this.searchPokemons.bind(this);
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

  public searchPokemons(event: React.SyntheticEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.setState({
      offset: 40,
      pokemons: PokeService.searchPokemonByNameOrId(value),
      searchQuery: value
    });
  }

  public render() {
    const InfiniteScroller = (props: { children: JSX.Element }) => (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadPokemons}
        hasMore={
          this.state.searchQuery === ""
            ? this.state.next
              ? true
              : false
            : false
        }
        loader={
          <h2
            className="loader"
            key={0}
            style={{ textAlign: "right", marginRight: "20px" }}>
            ... Loading
          </h2>
        }>
        {props.children}
      </InfiniteScroll>
    );

    const Pokemons = (
      <div id="page-container" className="grid-on-lg pokemons-list">
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

    return (
      <React.Fragment>
        <div id="pokemon-search-bar-wrapper">
          <input
            id="pokemon-search-bar"
            value={this.state.searchQuery}
            placeholder="Search for Pokémon"
            onChange={this.searchPokemons}
          />
        </div>
        {this.state.searchQuery === "" ? (
          <InfiniteScroller>{Pokemons}</InfiniteScroller>
        ) : (
          Pokemons
        )}
      </React.Fragment>
    );
  }
}

export default PokeListPage;
