const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.route");
const MONGO_DB_URL = require("./config/db.config");
const productRoute = require("./routes/product.route");
const singleProductRoute = require("./routes/singleProduct.route");
const portNumber = 5050;
const mailRoute = require("./routes/mail.route");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const path = require("path");
const shopRoute = require("./routes/shop.route");
const subscribersRoute = require("./routes/subscribers.route");
const newsLetterRoute = require("./routes/newsletter.route");

mongoose.set("strictQuery", false);
// connect to mongo DB

mongoose
  .connect(MONGO_DB_URL)
  .then((data) => {
    console.log("Mongo DB is connected.");
  })
  .catch((error) => {
    console.error(error);
    console.error("Error while connecting to mongo DB.");
  });
// communicate with external servers
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "150mb" }));

//routes
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/home", shopRoute);
app.use("/api/mail", mailRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/productDetails", singleProductRoute);
app.use("/api/subscribers", subscribersRoute);
app.use("/api/newsletter", newsLetterRoute);

app.listen(portNumber, (error) => {
  if (error) {
    console.log("---ERROR ON SERVER START---");
    console.log(error);
  } else {
    console.log(`Server is running on port: ${portNumber}`);
  }
});
