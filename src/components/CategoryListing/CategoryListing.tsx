import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "urql";
import { ProductTile } from "@/components/ProductTile";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const CategoryListingQuery = gql`
  query CategoryListingQuery($alias: String!, $limit: Int) {
    country {
      nameF2
    }
    listing: categoryListing(alias: $alias, limit: 28) {
      category {
        id
        caption
      }
      breadCrumbs {
        items {
          caption
          params
        }
      }
      page {
        products {
          product_item_id
          product {
            id
            image(width: 220, height: 260)
            name
            price
          }
        }
      }
    }
  }
`;

export const CategoryListing = () => {
  const { alias } = useParams();
  const [result] = useQuery({
    query: CategoryListingQuery,
    variables: { alias },
  });
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const { listing, country } = data;
  return (
    <div className="container">
      <h1 className="h2 my-2">{String.prototype.toUpperCase.call(listing.category.caption)} в {country.nameF2}</h1>
      <div className="mb-2">
        <Breadcrumbs items={listing.breadCrumbs.items}/>
      </div>
      <div className="row">
        {listing.page.products.map((item) => {
          return (
            <div
              key={item.product_item_id}
              className="col-6 col-md-3 col-lg-2 py-2"
            >
              <ProductTile
                image={item.product.image}
                name={item.product.name}
                price={item.product.price}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
