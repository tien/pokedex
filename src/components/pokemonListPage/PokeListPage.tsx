import "../../styles/PokeListPage.css";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useHistory, useParams } from "react-router-dom";

import PokemonTypeColors, {
  PokemonTypeColorAlias
} from "../../assets/PokemonTypeColors";
import { GlobalContext } from "../../contexts/GlobalContext";
import * as PokeService from "../../services/pokeService";
import PokeDetails from "../pokemonDetailsView/PokeDetails";
import PokeBall from "./PokeBall";

interface IPokeListRouteParams {
  id?: string;
}

const PokeListPage = () => {
  const { id: pokemonId } = useParams<IPokeListRouteParams>();
  const history = useHistory();

  const globalContext = useContext(GlobalContext);

  const searchBarRef = useRef<HTMLDivElement>(null);

  const [hasNext, setHasNext] = useState(true);
  const [offSet, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const loadPokemons = useCallback(async () => {
    const {
      pokemons: pokemonsResult,
      hasNext
    } = await PokeService.getAllPokemonWithLimitAndOffset(40, offSet);

    setHasNext(hasNext);
    setOffset(offSet => offSet + 40);
    setPokemons(pokemons => [...pokemons, ...pokemonsResult]);
  }, [offSet]);

  const goToPokemonDetails = useCallback(
    async (pokemonId: string) => {
      globalContext.toggleLoading();
      try {
        const pokemonDetails = await PokeService.getPokemonDetailsAndEvolutionChainByNameOrId(
          pokemonId
        );

        globalContext.toggleLoading();
        globalContext.openModalWithReactNode(
          <PokeDetails {...pokemonDetails} />,
          PokemonTypeColors[
            pokemonDetails.types[0].type.name as PokemonTypeColorAlias
          ],
          () => history.push("/browse")
        );
      } catch {
        globalContext.openModalWithReactNode(<h1>No pokemon found :{"("}</h1>);
        globalContext.toggleLoading();
      }
    },
    [globalContext, history]
  );

  useEffect(() => {
    const searchPokemons = async () => {
      const pokemonsSearchResult = await PokeService.searchPokemonByNameOrId(
        searchQuery
      );

      setOffset(40);
      setPokemons(pokemonsSearchResult);
      window.scrollTo(0, 0);
    };

    searchPokemons();
  }, [searchQuery]);

  useEffect(() => {
    const autoHideSearchBar = () => {
      const currScrollPos = window.pageYOffset;

      if (searchBarRef.current !== null) {
        if (prevScrollPos > currScrollPos) {
          searchBarRef.current.style.transform = "";
        } else {
          searchBarRef.current.style.transform = `translate(0, -${searchBarRef.current.clientHeight}px)`;
        }
      }

      if (currScrollPos >= 0) {
        setPrevScrollPos(currScrollPos);
      }
    };

    setPrevScrollPos(window.pageYOffset);

    window.addEventListener("scroll", autoHideSearchBar);

    return window.removeEventListener("scroll", autoHideSearchBar);
  }, [prevScrollPos]);

  useEffect(() => {
    if (pokemonId !== undefined) {
      goToPokemonDetails(pokemonId);
    }
  }, [pokemonId]);

  const Pokemons = (
    <div id="page-container" className="grid-on-lg pokemons-list">
      {pokemons.map((pokemon: any) => (
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
    <>
      <div ref={searchBarRef} id="pokemon-search-bar-wrapper">
        <input
          id="pokemon-search-bar"
          value={searchQuery}
          placeholder="Search for Pokémon"
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      {searchQuery === "" ? (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadPokemons}
          hasMore={searchQuery === "" ? (hasNext ? true : false) : false}
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
          {Pokemons}
        </InfiniteScroll>
      ) : (
        Pokemons
      )}
    </>
  );
};

export default PokeListPage;
