
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./Utlis/ExpressError.js");

const listingsRouter = require("./Routes/listing.js");

const app = express();
const port = 3000;

// view engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// database
main()
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

// routes
app.use("/", listingsRouter);

// error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("Error.ejs", { message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
