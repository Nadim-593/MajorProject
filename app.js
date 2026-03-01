const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const listingsRouter = require("./Routes/listing.js");
const reviewsRouter = require("./Routes/review.js"); 
const { date } = require("joi");
const passport  = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")
const app = express();
const port = 3000;

/* ======================
   View Engine Setup
====================== */
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ======================
   Global Middleware
====================== */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/* ======================
   Session Middleware (AGE)
====================== */
const sessionOption = {
  secret: "MySupperSceretCode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

 
// flash Middleware
app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
})

/* ======================
   Database Connection
====================== */
main()
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//Global home route 
app.get ("/",(req,res)=>{
  res.redirect("/listings")
})

app.get("/demouser", async (req,res) => {
  let FakeUser = new User({
    email:"student@gmai.com",
    username:"student"
  })
  let registeredUser = await User.register(FakeUser,"helloworld");
  res.send(registeredUser);
})

/* ======================
   Routes (PORE)
====================== */
app.use("/", listingsRouter);
app.use("/", reviewsRouter);




/* ======================
   Error Handler (SHOB SHESHE)
====================== */
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("Error.ejs", { message });
});

/* ======================
   Server Start
====================== */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});