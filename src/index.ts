import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { getServers } from "./server";
import * as http from "http";

const app = express();
const port = 3003;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // const expressServer = await getServers();
    // const httpServer = http.createServer(expressServer);

    console.log("Starting server...");
  } catch (error) {
    console.log(error);
  }
};

start();

// import dotenv from "dotenv";
// dotenv.config();

// import http from "http";

// import { getServers } from "./server";

// const startServer = async () => {
//   const port = process.env.PORT;

//   const expressServer = await getServers();
//   const server = http.createServer(expressServer);

//   console.log("Starting server...");

//   server.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
//   });
// };

// startServer();
