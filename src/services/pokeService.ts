import * as regrest from "regrest";
import pokemonsList from "../assets/pokemons.json";

class PokeService {
  public static baseUrl = "https://pokeapi.co/api/v2/";

  public static imageUrlBase: string =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  public static getPokemonEvolutionChainByNameOrId(id: number | string) {
    return regrest
      .get(`${this.baseUrl}pokemon-species/${id}/`)
      .then((res: any) => res.json)
      .then((res: any) =>
        regrest.get(res.evolution_chain.url).then((evoRes: any) => ({
          captureRate: res.capture_rate,
          evolutionChain: evoRes.json.chain,
          genderRate: res.gender_rate
        }))
      )
      .then((data: any) => ({
        captureRate: data.captureRate,
        evolutionChain: this.buildChain(data.evolutionChain),
        genderRate: data.genderRate
      }));
  }

  public static getPokemonByNameOrId(id: number | string): any {
    return regrest
      .get(`${this.baseUrl}pokemon/${id}/`)
      .then((res: any) => res.json)
      .then((data: any) => data)
      .then((details: any) => ({
        abilities: details.abilities,
        evolutionChain: details.evolutionChain,
        height: details.height,
        id: details.id,
        moves: details.moves,
        name: details.name,
        sprites: details.sprites,
        stats: details.stats,
        types: details.types,
        weight: details.weight
      }));
  }

  public static getPokemonDetailsAndEvolutionChainByNameOrId(
    id: number | string
  ) {
    return Promise.all([
      this.getPokemonByNameOrId(id),
      this.getPokemonEvolutionChainByNameOrId(id)
    ]).then(([details, evolutionChain]) => ({
      ...{
        abilities: details.abilities,
        evolutionChain: details.evolutionChain,
        height: details.height,
        id: details.id,
        moves: details.moves,
        name: details.name,
        sprites: details.sprites,
        stats: details.stats,
        types: details.types,
        weight: details.weight
      },
      ...evolutionChain
    }));
  }

  public static searchPokemonByNameOrId(query: string) {
    return pokemonsList.pokemons
      .filter(
        (pokemon: any) =>
          query.match(/^\d+$/g)
            ? pokemon.id === parseInt(query, 10)
            : pokemon.name.includes(query.toLowerCase().replace(/\s/g, "-"))
      )
      .slice(0, 40);
  }

  public static getAllPokemonWithLimitAndOffset(
    limit: number,
    offset: number
  ): any {
    return Promise.resolve({
      next: offset + limit < pokemonsList.count,
      pokemons: pokemonsList.pokemons.slice(offset, offset + limit)
    });
  }

  private static recursiveBuildChain(currGen: any) {
    const id = currGen.species.url.split("/").slice(-2, -1)[0];
    if (currGen.evolves_to.length === 0) {
      return {
        children: [],
        id,
        imageUrl: `${this.imageUrlBase}${id}.png`,
        name: currGen.species.name
      };
    } else {
      const children: any[] = [];
      for (const child of currGen.evolves_to) {
        children.push(this.recursiveBuildChain(child));
      }
      return {
        children,
        id,
        imageUrl: `${this.imageUrlBase}${id}.png`,
        name: currGen.species.name,
      };
    }
  }

  private static buildChain(data: any) {
    const id = data.species.url.split("/").slice(-2, -1)[0];
    const thisGen: any = {
      children: [],
      id,
      imageUrl: `${this.imageUrlBase}${id}.png`,
      name: data.species.name
    };
    const nextChain = data.evolves_to;
    if (nextChain.length !== 0) {
      nextChain.forEach((e: any) =>
        thisGen.children.push(this.recursiveBuildChain(e))
      );
    }
    return thisGen;
  }
}

export default PokeService;
