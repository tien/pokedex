import * as React from "react";

interface IPokeStatsProps {
  stats: [] | null;
}

const PokeStats = (props: IPokeStatsProps) => (
  <div>
    {props.stats &&
      props.stats.map((stat: any) => (
        <div>
          {stat.stat.name} {stat.base_stat}
        </div>
      ))}
  </div>
);

export default PokeStats;
