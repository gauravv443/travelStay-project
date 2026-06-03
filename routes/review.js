const express=require("express");
const router=express.Router({mergeParams:true}); 
const {ValidateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const Review=require("../models/reviews.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js"); 
const reviewController=require("../controllers/review.js");




router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

router.post("/",isLoggedIn,ValidateReview,wrapAsync(reviewController.createReview));

module.exports=router;