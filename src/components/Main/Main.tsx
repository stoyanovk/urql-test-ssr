import React from "react";
import { gql, useQuery } from "urql";
import { CategoryTile } from "@/components/CategoryTile";

const MainQuery = gql`
  query MainQuery {
    category(alias: "Dom-i-sad") {
      children {
        id
        caption
        alias
        imageUrl(width: 200, height: 200)
      }
    }
  }
`;

export const Main = () => {
  const [result] = useQuery({
    query: MainQuery,
  });
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const { children } = data.category;
  return (
    <div className="container">
      <h1 className="h2 my-2">Категории</h1>
      <div className="mb-2"></div>
      <div className="row">
        {children.map((item) => {
          return (
            <div key={item.id} className="col-6 col-md-3 col-lg-2 py-2">
              <CategoryTile
                image={item.imageUrl}
                name={item.caption}
                url={`/category/${item.alias}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
