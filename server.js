const express = require("express");
const app = express();
const cors = require("cors");
const { response } = require("express");
const PORT = 8000;
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "rappers-name";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("public"));

app.get("/", (request, response) => {
  db.collection("rappers")
    .find()
    .sort({ likes: -1 })
    .toArray()
    .then((data) => {
      response.render("index.ejs", { info: data });
    })
    .catch((error) => console.error(error));
});

// app.get("/api", (req, res) => {
//   res.json(rappers);
// });

// app.get("/api/:name", (req, res) => {
//   const rappersName = req.params.name.toLowerCase();
//   if (rappers[rappersName]) {
//     res.json(rappers[rappersName]);
//   } else {
//     res.json(rappers["unknown"]);
//   }
// });

app.post("/addRapper", (req, res) => {
  db.collection("rappers")
    .insertOne({
      stageName: req.body.stageName,
      birthName: req.body.birthName,
      likes: 0,
    })
    .then((result) => {
      console.log("Rapper Added");
      res.redirect("/");
    })
    .catch((error) => console.error(error));
});

app.delete("/deleteRapper", (request, response) => {
  db.collection("rappers")
    .deleteOne({ stageName: request.body.stageNameS })
    .then((result) => {
      console.log("Rapper Deleted");
      response.json("Rapper Deleted");
    })
    .catch((error) => console.error(error));
});

app.put("/addOneLike", (req, res) => {
  db.collection("rappers").updateOne({ stageName: req.body.stageName });
});

app.get("/rappers", (req, res) => {
  res.json(rappers);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on the PORT ${PORT}!`);
});
