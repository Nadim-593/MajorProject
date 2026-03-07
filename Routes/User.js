//login page
const express = require("express");
const router = express.Router();

const user = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup", async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new user({ username, email });
    const registeredUser = await user.register(newUser, password);
    req.login(registeredUser, (err)=>{
      if(err){
        return next(err);
      }
    req.flash("success", "Welcome to Wanderlust!");
    res.redirect("/listings");
    })

  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});
router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});
router.post("/login",
  saveRedirectUrl,
 passport.authenticate("local", { 
    failureRedirect: "/login", 
    failureFlash: true
}),
 async (req, res, next) => {
    req.flash("success", "Welcome back To Wanderlust!");
    // res.redirect("/listings");
    res.redirect(res.locals.redirectUrl);
});

router.get("/logout",(req,res , next)=>{
  req.logOut((err)=>{   //req.logOut() passport er invild method for Logout
    if(err){
     return next(err);
    }
  req.flash("success","You are logged out!")
  res.redirect("/listings");
  })                                
})
module.exports = router;