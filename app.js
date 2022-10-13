//Imports
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

//Middlewares
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

//Jokes File
const jokesFile = path.join(__dirname, "jokes.json");

//All Jokes
app.get("/", (req, res) => {
  let allJokes = fs.readFileSync(jokesFile);
  let view = JSON.parse(allJokes);
  res.status(200).send(view);
});

//Single Random Joke
app.get("/single", (req, res) => {
  let randomNumber = Math.round(Math.random() * 389);
  let allJokes = fs.readFileSync(jokesFile);
  res.status(200).send(JSON.stringify(JSON.parse(allJokes)[randomNumber]));
});

//Server Running
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started");
});
