const express = require("express");
const app = express();
app.use(express.json());
const port = 3100;

const routes = require("./routes");
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Привет, мир!");
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
