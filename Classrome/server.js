const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const users = require("./routes/user.js");
const posts = require("./routes/post.js");

app.get("/", (req, res) => {
res.send("Hi, I am root!");
});

app.use("/users", users);
app.use("/posts", posts);

app.use(cookieParser());

// Cookies 
app.get("/cookie", (req,res) => {
    res.cookie("greed", "value ")
    res.send("Hi ")
})

app.get("/cookie/checkName", (req,res)=>{
    let {name = "Nothing"} = req.cookies;
    res.send(`Hi ${name}`)
})
app.listen(3000, () => {
console. log("server is listening to 3000");
});

