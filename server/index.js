const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./.env" });

const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");
const commentRoutes = require("./Routes/commentRoutes");

const app = express();
const serverPort = process.env.PORT;

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.use(cors());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/comments", commentRoutes);

mongoose.connect(process.env.CONNECTION_URL);

app.listen(serverPort, () => {
  console.log(`Server started on ${serverPort}`);
});
