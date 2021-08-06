const express = require(`express`);
const router = express.Router({ mergeParams: true });
const {validateReview, isLoggedIn, isReviewAuthor} = require(`../middleware`)
const Campground = require(`../models/campground`);
const Review = require(`../models/review`);
const reviews = require(`../controllers/reviews`);
const catchAsync = require(`../utlis/catchAsync`);
const review = require("../models/review");

//reviews route
//new review
router.post(`/`, isLoggedIn, validateReview, catchAsync(reviews.createReview));

//delete review
router.delete(`/:reviewId`, isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
