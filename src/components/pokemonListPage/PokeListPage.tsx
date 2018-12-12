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
  private prevScrollPos: number;
  private searchBarRef: React.RefObject<HTMLDivElement>;

  constructor(props: IPokeListPageProps) {
    super(props);
    this.state = {
      next: true,
      offset: 0,
      pokemons: [],
      searchQuery: ""
    };
    this.prevScrollPos = 0;
    this.loadPokemons = this.loadPokemons.bind(this);
    this.searchPokemons = this.searchPokemons.bind(this);
    this.autoHideSearchBar = this.autoHideSearchBar.bind(this);
    this.searchBarRef = React.createRef();
  }

  public componentDidMount() {
    this.prevScrollPos = window.pageYOffset;
    window.addEventListener("scroll", this.autoHideSearchBar);
  }

  public componentWillUnmount() {
    window.removeEventListener("scroll", this.autoHideSearchBar);
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
    this.setState(
      {
        offset: 40,
        pokemons: PokeService.searchPokemonByNameOrId(value),
        searchQuery: value
      },
      () => window.scrollTo(0, 0)
    );
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
        <div ref={this.searchBarRef} id="pokemon-search-bar-wrapper">
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

  private autoHideSearchBar() {
    const currScrollPos = window.pageYOffset;
    if (this.prevScrollPos > currScrollPos && this.searchBarRef.current) {
      this.searchBarRef.current.style.transform = "";
    } else if (this.searchBarRef.current) {
      this.searchBarRef.current.style.transform = `translate(0, -${
        this.searchBarRef.current.clientHeight
      }px)`;
    }
    this.prevScrollPos = currScrollPos;
  }
}

export default PokeListPage;
