const express = require("express");
const { Produto } = require("../models/produto");

const router = express.Router();

// GET /produtos - Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
});

// GET /produtos/:id - Buscar produto por ID
router.get("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }
    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { descricao, preco } = req.body;

    if (!descricao || preco === undefined || preco === null) {
      return res.status(400).json({ erro: "Descrição e preço são obrigatórios" });
    }

    const novoProduto = await Produto.create({ descricao, preco });
    return res.status(201).json(novoProduto);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { descricao, preco } = req.body;

    if (!descricao || preco === undefined || preco === null) {
      return res.status(400).json({ erro: "Descrição e preço são obrigatórios" });
    }

    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    produto.descricao = descricao;
    produto.preco = preco;
    await produto.save();

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    const { descricao, preco } = req.body;

    if (descricao !== undefined) produto.descricao = descricao;
    if (preco !== undefined) produto.preco = preco;

    await produto.save();

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    await produto.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
