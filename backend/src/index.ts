import "dotenv/config";
import express from "express";

import router from "./routes";

require("./database/connection");

var cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this specific origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
