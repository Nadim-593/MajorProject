
const express = require("express");
const router = express.Router();
const {IsLoggedIn} = require("../middleware.js")
const Listing = require("../models/listing.js");

const { ListingSchema, reviewSchema } = require("../Schema.js");
const ExpressError = require("../Utlis/ExpressError.js");

// validation
const validateListing = (req, res, next) => {
  let { error } = ListingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// index
router.get("/listings", async (req, res, next) => {
  try {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
  } catch (err) {
    next(err);
  }
});

// new
router.get("/listings/new",
  IsLoggedIn,
  (req, res) => {
  res.render("listings/new.ejs");
});

// show
router.get("/listings/:id", async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("reviews").populate("owner");
    if(!listing){
      req.flash("error", "Listing you requested for does not exist!")
     return res.redirect("/listings")
    }
    res.render("listings/show.ejs", { listing , currUser: req.user});
  } catch (err) {
    next(err);
  }
});

// create
router.post("/listings",
   IsLoggedIn,
   validateListing, 
   async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;  //
    await newListing.save();
    req.flash("success", "New Listing Created!")
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});

// edit
router.get("/listings/:id/edit",
   IsLoggedIn,
 async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit.ejs", { listing });
  } catch (err) {
    next(err);
  }
});

// update
router.put("/listings/:id", 
  IsLoggedIn,
  validateListing,
    async (req, res, next) => {
  try {
    await Listing.findByIdAndUpdate(req.params.id, req.body.listing);
    req.flash("success", "updated Listing!")
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});

// delete listing
router.delete("/listings/:id",
   IsLoggedIn,
    async (req, res, next) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
     req.flash("success", "Delete Listing!")
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});


module.exports = router;
