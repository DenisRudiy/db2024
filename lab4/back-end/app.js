const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const port = 3100;

const routes = require("./routes");
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Привет, мир!");
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
