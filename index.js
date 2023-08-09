require("dotenv").config();
const connetToDb = require("./database/db");

const express = require("express");
const app = express();
const port = process.env.PORT || 500;
const cors = require("cors");

app.use(express.json());
app.use(cors());
const No = require("./model/No");

connetToDb();

app.get("/", async (req, res) => {
  const knots = await No.find();
  res.json(knots);
});

app.post("/ins", async (req, res) => {
  const newKnots = req.body;
  await KNonots.create(newKnots);

  res.status(201).json(newKnots);
});
app.put("/ins/:id", async (req, res) => {
  const { id } = req.params;
  const { name, nivel, type, linkImage, linkVideo, description } = req.body;
  await No.findByIdAndUpdate(id, {
    name,
    nivel,
    type,
    linkImage,
    linkVideo,
    description,
  });

  res.sendStatus(204);
});
app.delete("/ins/:id", async (req, res) => {
  const { id } = req.params;
  await No.findByIdAndDelete(id);

  res.sendStatus(204);
});

app.listen(port, () => console.log(`🚀 Meu site http://localhost:${port}`));
