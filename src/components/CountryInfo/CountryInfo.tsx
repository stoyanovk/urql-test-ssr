import React from "react";
import { gql, useQuery } from "urql";

const CountryQuery = gql`
  query CountryQuery {
    country {
      domain
      code
      name
      nameF2
    }
  }
`;

export const CountryInfo = () => {
  const [result] = useQuery({ query: CountryQuery });
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="card p-2">
      <p className="h4">Country info</p>
      <p>{data.country.domain}</p>
      <p>{data.country.code}</p>
      <p>{data.country.name}</p>
    </div>
  );
};
