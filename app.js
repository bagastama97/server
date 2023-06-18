const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const router = require("./routers/index");
const errorHandling = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(router);
app.use(errorHandling);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
