const express = require("express");
const router = express.Router() ;

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

module.exports = router;