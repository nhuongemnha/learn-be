const express = require("express");
const { rootRouter } = require("./src/routers/root.routers");
const app = express();
const dotenv = require('dotenv')

dotenv.config()

// setup định dang body thành json
app.use(express.json());

// http://localhost:7000/hello
app.get("/hello", (req, res) => {
  res.send("Xin Chào Nodejs 22");
});

// http://localhost:7000/api/v1
app.use("/api/v1", rootRouter);

// http://localhost:7000
const port = process.env.PORT;
app.listen(port, () => {
  console.log("app run on port : " + port);
});
