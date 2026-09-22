const express = require('express');
const sequelize = require('./config/banco');
const Usuario = require('./modelo/Usuario');
const Produtos = require('./modelo/Produtos');
const app = express()
const port = 3000

app.use(express.json());

app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
})

app.get('/produtos', async(req, res) => {
  const Produto = await Produtos.findAll();
  res.json(Produto);
})

app.post('/usuarios', async (req, res) => {
  const { nome } = req.body;
  const usuario = await Usuario.create({ nome });
  res.status(201).json(usuario);
});

app.post('/produtos', async (req, res) => {
  const {nome, descricao, preco} = req.body;
  const Produto = await Produtos.create({nome,descricao,preco});
  res.status(201).json(Produto);
});



sequelize.sync().then(() => {
  console.log(`Banco de dados conectado com sucesso!`);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
});
