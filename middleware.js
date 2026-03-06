 module.exports.IsLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){ // passport e isAuthenticated() invild method
   req.flash("error","you Must be Logged in to Create Listing!");
   return res.redirect("/login")
    }
    next();
 }
