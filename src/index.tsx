import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "@/components/App";
import { Client, cacheExchange, fetchExchange, ssrExchange } from "@urql/core";
import { devtoolsExchange } from "@urql/devtools";

const isServerSide = typeof window === "undefined";

const ssr = ssrExchange({
  isClient: !isServerSide,
});

if (!isServerSide) {
  ssr.restoreData(window.__URQL_DATA__);
}
const exchanges = [
  cacheExchange,
  ssr, // Add `ssr` in front of the `fetchExchange`
  fetchExchange,
];
if (process.env.NODE_ENV !== "production") {
  exchanges.push(devtoolsExchange);
}

const client = new Client({
  url: "http://localhost:9000/graphql",
  exchanges,
});

// @ts-ignore
client.subscribeToDebugTarget((event) => {
  console.log({ event });
});

const ClientApp = () => {
  return (
    <BrowserRouter>
      <App client={client} />
    </BrowserRouter>
  );
};
const rootNode = document.getElementById("root") as HTMLElement;

hydrateRoot(rootNode, <ClientApp />);
