const express = require("express");
const router = express.Router();

// Cookies 
router.get("/cookie", (req,res) => {
    res.cookie("greed", "value ")
    res.send("Hi ")
})

router.get("/cookie/checkName", (req,res)=>{
    let {name = "Nothing"} = req.cookies;
    res.send(`Hi ${name}`)
})

router.get("/cookie/setSigned", (req,res)=>{
    res.cookie("role","admin", {signed: true})
    res.send("signed cookie send!")
})
router.get("/cookie/verify",(req, res)=>{
    console.log(req.signedCookies);
    res.send()
    
})
module.exports = router;