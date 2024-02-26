require('dotenv').config();
const connetToDb = require('./database/db');

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor');
  next()
});
const No = require('./model/No');

connetToDb();

app.get('/', async (req, res) => {
  const knots = await No.find();
  return res.json(knots);
});

app.get('/no/:id', async (req, res) => {

  try {
    const { id } = req.params;
  
    const knots = await No.findById(id);
    if (!knots) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    return res.json(knots);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/ins', async (req, res) => {
  const newKnot = req.body;
  await No.create(newKnot);

  return res.status(201).json(newKnot);
});
app.put('/ins/:id', async (req, res) => {
  const { id } = req.params;
  const { name, lastName, nivel, type, linkImage, linkVideo, description } = req.body;
  await No.findByIdAndUpdate(id, {
    name,
    lastName,
    nivel,
    type,
    linkImage,
    linkVideo,
    description,
  });

  return res.sendStatus(204);
});
app.delete('/ins/:id', async (req, res) => {
  const { id } = req.params;
  await No.findByIdAndDelete(id);

  return res.sendStatus(204);
});

app.listen(port, () => console.log(`🚀 Meu site http://localhost:${port}`));
