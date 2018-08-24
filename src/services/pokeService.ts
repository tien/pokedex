import regrest from "regrest";

class PokeService {
  public static imageUrlBase: string =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  public static getPokemonEvolutionChainById(id: number) {
    regrest
      .get(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
      .then((res: any) => res.json.chain);
  }

  public static getPokemonByNameOrId(id: number): any {
    return regrest
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res: any) => res.json)
      .then((data: any) => data);
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
}

export default PokeService;
