import React from "react";
import "../../styles/PokeStats.css";

interface IPokeStatsProps {
  stats: [] | null;
  color: string;
}

const PokeStats = (props: IPokeStatsProps) => (
  <div className="stats">
    {props.stats &&
      props.stats.map((stat: any, index: number) => (
        <div key={index} className="stat">
          <div className="stat-label">
            {stat.stat.name === "special-defense"
              ? "sd"
              : stat.stat.name === "special-attack"
              ? "sa"
              : stat.stat.name}
          </div>
          <div className="stat-bar-bg">
            <div
              className="stat-bar"
              style={{
                backgroundColor: props.color,
                transform: `scaleX(${stat.base_stat / 255})`
              }}
            />
            <div className="stat-number">{stat.base_stat}</div>
          </div>
        </div>
      ))}
  </div>
);

export default PokeStats;
