import React from "react";
import { Routes, Route } from "react-router-dom";

import { Client, Provider } from "urql";
import { Header } from "@/components/Header";
import { CategoryListing } from "@/components/CategoryListing";
import { Main } from "@/components/Main";

export const App = ({ client }: { client: Client }) => {
  return (
    <Provider value={client}>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/category/:alias" element={<CategoryListing />} />
      </Routes>
    </Provider>
  );
};
