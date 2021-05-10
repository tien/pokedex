import "../../styles/PokeEvolution.css";

import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useEnterKeyCallback } from "../../utils/hooks";
import { getPokemonDetailsRoute } from "../../routes";

interface IPokeEvolutionProps {
  evolutionChain: any;
  color: string;
}

interface IRecursivePokeEvolution {
  currGen: any;
  color: string;
  key: number;
  callback: (id: number | string) => void;
}

const Arrow = (props: any) => (
  <svg
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
  >
    <path d="M24 16V8l16 16-16 16v-8H8V16z" />
  </svg>
);

const RecursivePokeEvolution = ({
  currGen,
  color,
  callback,
}: IRecursivePokeEvolution) => {
  const onClick = () => callback(currGen.name);
  const onEnterPress = useEnterKeyCallback(onClick, [onClick]);

  const EvolutionStep = useCallback(
    () => (
      <figure
        className="poke-evo-parent"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyPress={onEnterPress}
      >
        <img src={currGen.imageUrl} alt="pokemon evolution" />
        <figcaption>{currGen.name}</figcaption>
      </figure>
    ),
    [currGen.imageUrl, currGen.name, onClick, onEnterPress]
  );

  return currGen.children.length === 0 ? (
    <EvolutionStep />
  ) : (
    <div className="poke-evo-wrapper">
      <EvolutionStep />
      <Arrow style={{ fill: color, stroke: color }} />
      <div className="poke-evo-children-group">
        {currGen.children.map((child: any) => (
          <RecursivePokeEvolution
            currGen={child}
            color={color}
            key={child.name}
            callback={callback}
          />
        ))}
      </div>
    </div>
  );
};

const PokeEvolution = (props: IPokeEvolutionProps) => {
  const history = useHistory();

  const goToPokemonRoute = (id: number | string) =>
    history.push(getPokemonDetailsRoute(String(id)));

  return (
    <section className="poke-evo-tree">
      <RecursivePokeEvolution
        currGen={props.evolutionChain}
        color={props.color}
        key={0}
        callback={goToPokemonRoute}
      />
    </section>
  );
};

export default PokeEvolution;
