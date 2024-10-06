import React from "react";
import * as s from './style.css';

export const ProductTile = ({
  image,
  name,
  price,
}: {
  image: string;
  name: string;
  price: string;
}) => {
  return (
    <div className="card h-100">
      <img src={image} width={200} height={200} className="card-img-top" alt="..." />
      <div className="card-body d-flex flex-column justify-content-between">
        <p className={s.name}>{name}</p>
        <b className="card-text">{price}грн</b>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary w-100">Купить</button>
      </div>
    </div>
  );
};
