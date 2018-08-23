import * as React from "react";

interface IPokeCardProps {
  id: number;
  name: string;
  types: [];
  imageUrl: string;
}

const PokeCard = (props: IPokeCardProps) => (
  <div className="card-section profile">
    <div className="profile-title">
      <img className="ava" src={props.imageUrl} />
      <h3>{props.name}</h3>
      <h6>{props.id}</h6>
    </div>
    <div className="profile-content">{props.types.join(" | ")}</div>
  </div>
);

export default PokeCard;
