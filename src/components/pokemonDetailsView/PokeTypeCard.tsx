import PokemonMoveCategoryColor, {
  PokemonMoveCategoryColorAlias
} from "../../assets/PokemonMoveCategoryColor";
import PokemonTypeColors, {
  PokemonTypeColorAlias
} from "../../assets/PokemonTypeColors";
import "../../styles/PokeTypeCard.css";

interface IPokeTypeCardPropsWithType {
  type: PokemonTypeColorAlias;
  style?: any;
}

interface IPokeTypeCardPropsWithCategory {
  category: PokemonMoveCategoryColorAlias;
  style?: any;
}

const PokeTypeCard = (
  props: IPokeTypeCardPropsWithType | IPokeTypeCardPropsWithCategory
) => {
  let color;
  let name;
  if ((props as IPokeTypeCardPropsWithType).type) {
    color = PokemonTypeColors[(props as IPokeTypeCardPropsWithType).type];
    name = (props as IPokeTypeCardPropsWithType).type;
  } else if ((props as IPokeTypeCardPropsWithCategory).category) {
    color =
      PokemonMoveCategoryColor[
        (props as IPokeTypeCardPropsWithCategory).category
      ];
    name = (props as IPokeTypeCardPropsWithCategory).category;
  }
  return (
    <div
      className="poke-type-card"
      style={{
        backgroundColor: color,
        ...props.style
      }}
    >
      {name}
    </div>
  );
};

export default PokeTypeCard;
