import React from "react";
import "../../styles/PokeStats.css";

interface IPokeStatsProps {
  stats: any[] | null;
  color: string;
}

const PokeStats = ({ stats, color }: IPokeStatsProps) => (
  <div className="stats">
    {stats?.map((stat: any, index: number) => (
      // eslint-disable-next-line react/no-array-index-key
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
              backgroundColor: color,
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
