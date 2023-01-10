const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8000;

const app = express();
// router.use(bodyParser.json());
app.use(bodyParser.json());
app.use(cors());
// app.use("/static", express.static("./static/"));

const rappers = {
  "21 savage": {
    age: 29,
    birthName: "Shéyaa Bin Abraham-Joseph",
    birtLocation: "London, England",
  },
  "chance the rapper": {
    age: 29,
    birthName: "Chancelor Johnathan Bennett",
    birtLocation: "Chicago, Illinois",
  },
  dylan: {
    age: 32,
    birthName: "Dylan Joel Smith",
    birtLocation: "Madrid, Spain",
  },
};

app.use(express.static("public"));
app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/index.html");
});

app.get("/api", (req, res) => {
  res.json(rappers);
});

app.get("/api/:name", (req, res) => {
  const rappersName = req.params.name.toLowerCase();
  if (rappers[rappersName]) {
    res.json(rappers[rappersName]);
  } else {
    res.json(rappers["unknown"]);
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on the PORT ${PORT}!`);
});
