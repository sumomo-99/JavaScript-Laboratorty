const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const data = require("./data.json");

app.use(cors());
app.use("/", express.static("./build"));
app.get("/data", (req, res, next) => res.json(data));
app.listen(port, () => console.log(`Web service running on port ${port}`));