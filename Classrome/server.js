const express = require("express");
const app = express();



const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookies = require("./routes/cookies.js");
const sessionTest = require("./routes/sessionTest.js");
const cookieParser = require("cookie-parser"); // import cookie-parser
const session = require("express-session")
const flash = require("connect-flash")
const path = require("path");
const ejsMate = require("ejs-mate");

// view engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const sessionOption = {
    secret : " keyBoard Cat",
    resave: false,
    saveUninitialized: true,
}

app.use(session(sessionOption));
app.use(flash());


app.use(cookieParser("secretCode"));    //cookie-parser
app.use("/users", users);
app.use("/posts", posts);
app.use("/",cookies);
app.use("/",sessionTest)




app.get("/", (req, res) => {
res.send("Hi, I am root!");
});




app.listen(3000, () => {
console. log("server is listening to 3000");
});

