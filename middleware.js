 module.exports.IsLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){ // passport e isAuthenticated() invild method
      //redirect URl 
      req.session.redirectUrl= req.originalUrl;
   req.flash("error","you Must be Logged in to Create Listing!");
   return res.redirect("/login")
    }
    next();
 }

 module.exports.saveRedirectUrl= (req,res,next)=>{
   if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
   }
   next();
 }