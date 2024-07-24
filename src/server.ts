import bodyParser from "body-parser";
import express from "express";

import connectMongoDB from "./libs/mongodb";
import { todoRoutes, userRoutes } from "./routes";
import cors from "cors";

export const getServers = async () => {
  const app = express();
  connectMongoDB();

  app.use(bodyParser.json());
  app.use(cors());

  app.get("/", async (req, res) => {
    try {
      return res.json({
        message: "Hello from serverrr asdsdsadsd",
      });
    } catch (error) {
      return res.status(500).json({ message: "Somethign went wrong" });
    }
  });

  app.use("/todo", todoRoutes);
  app.use("/user", userRoutes);

  return app;
};
