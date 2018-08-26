import regrest from "regrest";

class PokeService {
  public static imageUrlBase: string =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  public static getPokemonEvolutionChainById(id: number) {
    return regrest
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then((res: any) => regrest.get(res.json.evolution_chain.url))
      .then((res: any) => res.json.chain)
      .then((data: any) => this.buildChain(data));
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

  public static getAllPokemonWithLimitAndOffset(
    limit: number,
    offset: number
  ): any {
    return regrest
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((res: any) => res.json.results)
      .then((pokemons: any) =>
        pokemons.map((pokemon: any, index: number) => ({
          ...pokemon,
          id: index + offset + 1,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            this.imageUrlBase
          }${index + offset + 1}.png`
        }))
      );
  }

  private static recursiveBuildChain(currGen: any) {
    if (currGen.evolves_to.length === 0) {
      return { name: currGen.species.name, children: [] };
    } else {
      const children: any[] = [];
      for (const child of currGen.evolves_to) {
        children.push(this.recursiveBuildChain(child));
      }
      return { name: currGen.species.name, children };
    }
  }

  private static buildChain(data: any) {
    const thisGen: any = { name: data.species.name, children: [] };
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
