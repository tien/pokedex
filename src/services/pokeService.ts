import regrest from "regrest";

class PokeService {
  public static imageUrlBase: string =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  public static getPokemonEvolutionChainByNameOrId(id: number | string) {
    return regrest
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then((res: any) =>
        regrest.get(res.json.evolution_chain.url).then((evoRes: any) => ({
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
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
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

  public static getAllPokemonWithLimitAndOffset(
    limit: number,
    offset: number
  ): any {
    return regrest
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((res: any) => res.json)
      .then(({ results: pokemons, next }: any) => ({
        next,
        pokemons: pokemons.map((pokemon: any, index: number) => ({
          ...pokemon,
          id: index + offset + 1,
          imageUrl: `${this.imageUrlBase}${index + offset + 1}.png`
        }))
      }));
  }

  private static recursiveBuildChain(currGen: any) {
    const url = `${this.imageUrlBase}${
      currGen.species.url.split("/").slice(-2, -1)[0]
    }.png`;
    if (currGen.evolves_to.length === 0) {
      return { name: currGen.species.name, imageUrl: url, children: [] };
    } else {
      const children: any[] = [];
      for (const child of currGen.evolves_to) {
        children.push(this.recursiveBuildChain(child));
      }
      return { name: currGen.species.name, imageUrl: url, children };
    }
  }

  private static buildChain(data: any) {
    const thisGen: any = {
      children: [],
      imageUrl: `${this.imageUrlBase}${
        data.species.url.split("/").slice(-2, -1)[0]
      }.png`,
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
