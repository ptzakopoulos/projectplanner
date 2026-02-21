require("colors");
//Importing dotenv
require("dotenv").config();
const dataBaseUrl = process.env.db_connect;
const cors = require("cors");
const bodyParser = require("body-parser");
//App requirements
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");

const app = express();

const PORT = 3002;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(bodyParser.json());

app.use(authRoutes);
app.use(userRoutes);

mongoose
  .connect(dataBaseUrl)
  .then((result) => {
    app.listen(PORT);
    console.log(`Server is listening to : `.blue, PORT);
  })
  .catch((err) => console.log(err));
