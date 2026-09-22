const express = require("express");
const { sequelize } = require("./models/produto");
const produtosRouter = require("./rotas/produtos");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", api: "Produtos" });
});

app.use("/produtos", produtosRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API de Produtos rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar com o banco de dados:", err);
  });

module.exports = app;
