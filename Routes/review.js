const express = require("express");
const router = express.Router();

const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");

const { reviewSchema } = require("../Schema.js");
const ExpressError = require("../Utlis/ExpressError.js");

// validate review 
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

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