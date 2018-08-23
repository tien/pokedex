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
    return regrest.get("https://pokeapi.co/api/v2/pokemon");
  }
}

export default PokeService;
