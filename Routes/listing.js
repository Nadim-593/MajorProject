
const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

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

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
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
router.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// show
router.get("/listings/:id", async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    next(err);
  }
});

// create
router.post("/listings", validateListing, async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});

// edit
router.get("/listings/:id/edit", async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit.ejs", { listing });
  } catch (err) {
    next(err);
  }
});

// update
router.put("/listings/:id", validateListing, async (req, res, next) => {
  try {
    await Listing.findByIdAndUpdate(req.params.id, req.body.listing);
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});

// delete listing
router.delete("/listings/:id", async (req, res, next) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});

// create review
router.post(
  "/listings/:id/reviews",
  validateReview,
  async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
      const review = new Review(req.body.review);

      await review.save();
      listing.reviews.push(review);
      await listing.save();

      res.redirect(`/listings/${listing._id}`);
    } catch (err) {
      next(err);
    }
  }
);

// delete review
router.delete(
  "/listings/:id/reviews/:reviewId",
  async (req, res, next) => {
    try {
      await Listing.findByIdAndUpdate(req.params.id, {
        $pull: { reviews: req.params.reviewId }
      });

      await Review.findByIdAndDelete(req.params.reviewId);

      res.redirect(`/listings/${req.params.id}`);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
