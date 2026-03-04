//login page
const express = require("express");
const router = express.Router();

const user = require("../models/user.js");


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

// router.post("/signup",async (req,res) => {
//     let {username, password} = req.body;
//    const newUser =  new user({email, password});
//   const registerUser =  await user.register(newUser,password);
//   console.log(registerUser);
//   req.flash("success","Welcome to Wanderlust!");
//   res.redirect("/listing")
  
// })
router.post("/signup", async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new user({ username, email });
    const registeredUser = await user.register(newUser, password);

    req.flash("success", "Welcome to Wanderlust!");
    res.redirect("/listings");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});
module.exports = router;