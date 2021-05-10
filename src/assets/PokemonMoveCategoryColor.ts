enum PokemonMoveCategoryColor {
  physical = "#c92112",
  special = "#4f5870",
  status = "#8c888c",
}

export type PokemonMoveCategoryColorAlias =
  keyof typeof PokemonMoveCategoryColor;

export default PokemonMoveCategoryColor;
