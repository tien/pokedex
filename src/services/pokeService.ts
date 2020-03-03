import regrest from "regrest";
import pokemonsList from "../assets/pokemons.json";

const baseUrl = "https://pokeapi.co/api/v2/";

const imageUrlBase: string =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export const getPokemonEvolutionChainBySpeciesNameOrId = (
  id: number | string
) => {
  return regrest
    .get(`${baseUrl}pokemon-species/${id}/`)
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
      evolutionChain: buildChain(data.evolutionChain),
      genderRate: data.genderRate
    }));
};

export const getPokemonByNameOrId = (id: number | string) => {
  return regrest
    .get(`${baseUrl}pokemon/${id}/`)
    .then((res: any) => res.json)
    .then((data: any) => data)
    .then((details: any) => ({
      abilities: details.abilities,
      evolutionChain: details.evolutionChain,
      height: details.height,
      id: details.id,
      moves: details.moves,
      name: details.name,
      species: details.species.name,
      sprites: details.sprites,
      stats: details.stats,
      types: details.types.sort((x: any) => x.slot),
      weight: details.weight
    }));
};

export const getPokemonDetailsAndEvolutionChainByNameOrId = (
  id: number | string
) =>
  getPokemonByNameOrId(id).then(details =>
    getPokemonEvolutionChainBySpeciesNameOrId(details.species).then(
      evolutionChain => ({
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
      })
    )
  );

export const searchPokemonByNameOrId = (query: string) =>
  pokemonsList.pokemons
    .filter((pokemon: any) =>
      query.match(/^\d+$/g)
        ? pokemon.id === parseInt(query, 10)
        : pokemon.name.includes(query.toLowerCase().replace(/\s/g, "-"))
    )
    .slice(0, 40);

export const getAllPokemonWithLimitAndOffset = (
  limit: number,
  offset: number
): any =>
  Promise.resolve({
    next: offset + limit < pokemonsList.count,
    pokemons: pokemonsList.pokemons.slice(offset, offset + limit)
  });

export const recursiveBuildChain = (currGen: any) => {
  const id = currGen.species.url.split("/").slice(-2, -1)[0];
  if (currGen.evolves_to.length === 0) {
    return {
      children: [],
      id,
      imageUrl: `${imageUrlBase}${id}.png`,
      name: currGen.species.name
    };
  }

  const children: any[] = currGen.evolves_to.map((child: any) =>
    recursiveBuildChain(child)
  );

  return {
    children,
    id,
    imageUrl: `${imageUrlBase}${id}.png`,
    name: currGen.species.name
  };
};

export const buildChain = (data: any) => {
  const id = data.species.url.split("/").slice(-2, -1)[0];

  return {
    children:
      data.evolves_to.length === 0
        ? []
        : data.evolves_to.map((e: any) => recursiveBuildChain(e)),
    id,
    imageUrl: `${imageUrlBase}${id}.png`,
    name: data.species.name
  };
};
