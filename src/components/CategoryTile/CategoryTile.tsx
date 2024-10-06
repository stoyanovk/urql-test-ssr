import React from "react";
import { NavLink } from "react-router-dom";

export const CategoryTile = ({
  image,
  name,
  url,
}: {
  image: string;
  name: string;
  url: string;
}) => {
  return (
    <NavLink to={url} className="card h-100">
      <img
        src={image}
        width={200}
        height={200}
        className="card-img-top"
        alt={name}
      />
      <div className="card-body">
        <p className="card-text text-center">{name}</p>
      </div>
    </NavLink>
  );
};
