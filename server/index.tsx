import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import prepass from "react-ssr-prepass";
import { Client, cacheExchange, fetchExchange, ssrExchange } from "urql";
import { devtoolsExchange } from "@urql/devtools";

import { App } from "@/components/App";

const app = express();
const GRAPH_URL = "https://prom.ua/graphql";

app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(express.static(path.resolve(__dirname, "../static")));

app.use(express.json());

// Клиентский запрос на https://prom.ua/graphql не проходит из-за корса
// пришлось сделать прокси запрос
app.post("/graphql", async (req, res) => {
  try {
    const response = await axios.post(GRAPH_URL, req.body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error occurred while processing the request.");
  }
});

// @ts-ignore
app.get("*", async (req, res) => {
  try {
    let indexHTML = fs.readFileSync(
      path.resolve(__dirname, "../dist/template.html"),
      {
        encoding: "utf8",
      }
    );

    const ssr = ssrExchange({ isClient: false });
    const exchanges = [cacheExchange, ssr, fetchExchange];

    if (process.env.NODE_ENV !== "production") {
      exchanges.push(devtoolsExchange);
    }

    const client = new Client({
      url: GRAPH_URL,
      suspense: true, // This activates urql's Suspense mode on the server-side
      exchanges,
    });

    const element = (
      <StaticRouter location={req.originalUrl}>
        <App client={client} />
      </StaticRouter>
    );
    // @ts-ignore
    client.subscribeToDebugTarget((event) => {
      console.log({ event });
    });

    await prepass(element);

    const appHTML = renderToString(element);
    // Extract the data after prepass and rendering
    const data = JSON.stringify(ssr.extractData());
    indexHTML = indexHTML.replace(
      '<div id="root"></div>',
      `<div id="root">${appHTML}</div>
       <script>window.__URQL_DATA__ = ${data}</script>`
    );
    res.contentType("text/html");
    res.status(200);
    return res.send(indexHTML);
  } catch (e) {
    res.send(e);
  }
});

app.listen("9000", () => {
  console.log("Express server started at http://localhost:9000");
});
