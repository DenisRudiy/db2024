const express = require("express");
const app = express();
const port = 3100;

app.get("/", (req, res) => {
  res.send("Привет, мир!");
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
