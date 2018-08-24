import regrest from "regrest";

class PokeService {
  public static getPokemonByNameOrId(id: string): any {
    return (
      regrest
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res: any) => res.json)
        .then((data: any) => data)
        // tslint:disable-next-line:no-console
        .catch((e: string) => console.log(e))
    );
  }

  public static getAllPokemon(): any {
    return (
      regrest
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((data: any) => data.json.results)
        .then((pokemons: any) =>
          Promise.all(
            pokemons.map((pokemon: any) =>
              regrest
                .get(pokemon.url)
                .then((pokemonDetails: any) => pokemonDetails.json)
            )
          )
        )
        // tslint:disable-next-line:no-console
        .catch((e: string) => console.log(e))
    );
  }
}

export default PokeService;
