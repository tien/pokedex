import regrest from "regrest";

import pokemonsList from "../assets/pokemons.json";

const baseUrl = "https://pokeapi.co/api/v2/";

const imageUrlBase =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export const getPokemonEvolutionChainBySpeciesNameOrId = async (
  id: number | string
) => {
  const pokemonSpecies = await regrest
    .get(`${baseUrl}pokemon-species/${id}/`)
    .then((res) => res.json);

  const pokemonEvoChain = await regrest
    .get(pokemonSpecies.evolution_chain.url)
    .then((res) => res.json);

  const flavourText = (pokemonSpecies.flavor_text_entries as any[]).find(
    (flavour) => flavour.language.name === "en"
  )?.flavor_text;

  return {
    captureRate: pokemonSpecies.capture_rate,
    evolutionChain: buildChain(pokemonEvoChain.chain),
    genderRate: pokemonSpecies.gender_rate,
    flavourText,
  };
};

export const getPokemonByNameOrId = async (id: number | string) => {
  const pokemonDetails = await regrest
    .get(`${baseUrl}pokemon/${id}/`)
    .then((res: any) => res.json);

  return {
    ...pokemonDetails,
    types: pokemonDetails.types.sort((x: any) => x.slot),
  };
};

export const getPokemonDetailsAndEvolutionChainByNameOrId = async (
  id: number | string
) => {
  const pokemonDetails = await getPokemonByNameOrId(id);
  const evolutionChainAndExtraDetails =
    await getPokemonEvolutionChainBySpeciesNameOrId(
      pokemonDetails.species.name
    );

  return {
    ...pokemonDetails,
    ...evolutionChainAndExtraDetails,
  };
};

export const searchPokemonByNameOrId = async (query: string) =>
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
    hasNext: offset + limit < pokemonsList.count,
    pokemons: pokemonsList.pokemons.slice(offset, offset + limit),
  });

export const recursiveBuildChain = (currGen: any) => {
  const id = currGen.species.url.split("/").slice(-2, -1)[0];
  if (currGen.evolves_to.length === 0) {
    return {
      children: [],
      id,
      imageUrl: `${imageUrlBase}${id}.png`,
      name: currGen.species.name,
    };
  }

  const children: any[] = currGen.evolves_to.map((child: any) =>
    recursiveBuildChain(child)
  );

  return {
    children,
    id,
    imageUrl: `${imageUrlBase}${id}.png`,
    name: currGen.species.name,
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
    name: data.species.name,
  };
};
