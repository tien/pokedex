import "../../styles/PokeListPage.css";

import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { RouteComponentProps } from "react-router-dom";

import PokemonTypeColors, {
  PokemonTypeColorAlias
} from "../../assets/PokemonTypeColors";
import { GlobalContext, IGlobalContext } from "../../contexts/GlobalContext";
import PokeService from "../../services/pokeService";
import PokeDetails from "../pokemonDetailsView/PokeDetails";
import PokeBall from "./PokeBall";

interface IPokeListRouterProps {
  id?: string;
}

interface IPokeListPageProps extends RouteComponentProps<IPokeListRouterProps> {
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
  public static contextType = GlobalContext;
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
    this.openPokemonDetailsWithURL();

    this.prevScrollPos = window.pageYOffset;
    window.addEventListener("scroll", this.autoHideSearchBar);
  }

  public componentDidUpdate(prevProps: IPokeListPageProps) {
    this.openPokemonDetailsWithURL(prevProps.match.params.id);
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
            style={{ textAlign: "right", marginRight: "20px" }}
          >
            ... Loading
          </h2>
        }
      >
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

  private openPokemonDetailsWithURL(prevId?: string) {
    const value = this.context as IGlobalContext;
    const pokemonId = this.props.match && this.props.match.params.id;

    if (!pokemonId || (prevId && prevId === pokemonId)) {
      return;
    }

    value.toggleLoading();
    PokeService.getPokemonDetailsAndEvolutionChainByNameOrId(pokemonId)
      .then((details: any) => {
        value.toggleLoading();
        value.openModalWithReactNode(
          <PokeDetails {...details} />,
          PokemonTypeColors[
            details.types[0].type.name as PokemonTypeColorAlias
          ],
          () => this.props.history.push("/browse")
        );
      })
      .catch((error: Error) => {
        value.toggleLoading();
      });
  }

  private autoHideSearchBar() {
    const currScrollPos = window.pageYOffset;
    if (this.prevScrollPos > currScrollPos && this.searchBarRef.current) {
      this.searchBarRef.current.style.transform = "";
    } else if (this.searchBarRef.current) {
      this.searchBarRef.current.style.transform = `translate(0, -${this.searchBarRef.current.clientHeight}px)`;
    }
    if (currScrollPos >= 0) {
      this.prevScrollPos = currScrollPos;
    }
  }
}

export default PokeListPage;
