const { name } = require("ejs");
const express = require("express");
const router = express.Router() ;

router.use((req,res,next) =>{
    res.locals.success= req.flash("success")
    res.locals.fail = req.flash("fail")
      next();
})
router.get("/session/test",( req, res )=> {
    res.send("session test");
})
router.get("/session/reqCount",  (req,res) => {
       if (req.session.count){
        req.session.count++;
       }else{
        req.session.count = 1 ;
       }
       res.send(`you sent a request ${req.session.count} times! `)
})
router.get("/session/WithoutSessionReqCount",  (req,res) => {
       if (req.count){
        req.count++;
       }else{
        req.count = 1 ;
       }
       res.send(`you sent a request ${req.count} times! `)
})
router.get("/register",  (req,res) => {
    let {name = "anynomus"} = req.query;
    req.session.name=name;
    if(name==="anynomus") {req.flash("fail","user Register fail")}
    else {req.flash("success","user Register Successful")}
    // res.send(name);
    res.redirect("/hello")
})
router.get("/hello",(req,res)=>{
    // res.send(`my name is = ${req.session.name}`)
    res.render("page.ejs",{name : req.session.name })
})
module.exports = router;