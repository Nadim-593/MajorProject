const express = require('express');
const mongoose = require('mongoose');
const path = require('path');// Import the 'path' module>>>>> eita diye publci access nite help kore 
const app = express()
const port = 3000
const Listing = require("./models/listing.js");
const { title } = require('process');
const methodOverride = require('method-override');
 const ejsMate = require('ejs-mate');
 const ExpressError = require ("./Utlis/ExpressError.js")
 
// Specify the directory where your EJS template files are located
// Using path.join(__dirname, 'views') is recommended for robust path resolution
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, '/views')); //Views folder == EjS file
app.engine('ejs', ejsMate); // Tell Express to use ejs-mate for EJS files
app.use(express.static(path.join(__dirname,"/public"))) //public folder
app.use(express.urlencoded({extended : true}));
  app.use(methodOverride('_method')); 


// Database Connection
main()
.then(() => {
  console.log("connections Successful");
  
})
.catch(err => console.log(err));
                                                   // Database name
async function main() {                           //   ^
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

//index Route 
app.get("/listings", async(req , res, next) => {
  try {
      const allListing = await Listing.find({});
  res.render("listings/index.ejs",{allListing})
  }catch(err){
    next(err)
  }


})

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs"); 
});

//Show Route
app.get("/listings/:id", async (req, res, next) => {
  try{
      let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
  } catch(err){
    next(err);
  }

});

//cretae route
app.post("/listings", async (req, res, next) =>{
  try{
      // let {title , descriptiption, imaeg, price, country , location} = req.body;
  let newListing = new Listing (req.body.listing);
  await newListing.save()
  res.redirect("/listings")
  
  } catch(err){
    next(err)
  }
})

//Edit Rout
app.get("/listings/:id/edit", async (req , res,next) =>{
  try{
        let{id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});
  }catch(err){
    next(err);
  }

})

//update 
app.put("/listings/:id" , async (req, res,next) =>{
  try{
        let{id} = req.params;
 await Listing.findByIdAndUpdate(id, {...req.body.listing})
 res.redirect("/listings")
  }catch(err){
    next(err);
  }

})
// Delete 
app.delete("/listings/:id", async(req, res,next)=>{
  try{
       let{id} = req.params;
  let deleteListing = await  Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  res.redirect("/listings")
  }catch(err){
    next(err);
  }

})
// app.get('/testlisting', async (req, res) => {
//   let sampleListing =  new Listing({
//     title:"My New Villa",
//     descriptions :"By the beach",
//     price:2000,
//     location:"Calangute, Goa",
//     country:"India"
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("Successful testing");
  
// })

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});


// error handdaling middleware 
app.use((err,req,res,next)=>{
  let {StatusCode = 500 , message =" Something went wrong" } = err;
  res.status(StatusCode).send(message);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})