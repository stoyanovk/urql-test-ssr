import React from "react";
import { NavLink } from "react-router-dom";

export const Breadcrumbs = ({
  items,
}: {
  items: { caption: string; params: { alias: string } }[];
}) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <NavLink to="/">Главная</NavLink>
        </li>

        {items.slice(1).map((item, index, arr) => {
          if (index === arr.length - 1) {
            return (
              <li className="breadcrumb-item active" aria-current="page" key={item.caption}>
                {item.caption}
              </li>
            );
          }
          return (
            <li className="breadcrumb-item" key={item.caption}>
              <NavLink to={`/category/${item.params.alias}`}>{item.caption}</NavLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
