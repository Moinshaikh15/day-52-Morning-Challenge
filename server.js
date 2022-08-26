const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const placesRouter=require('./routes/places')
let app = express();

let DB_URL =
  "mongodb+srv://test:test123@cluster0.pkvnn0u.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected To DB"))
  .catch((err) => console.log("error", err.message));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/places",placesRouter )

app.listen(8000);
