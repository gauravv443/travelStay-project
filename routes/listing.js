const express=require("express");
const router=express.Router(); 
const listingController=require("../controllers/listings.js")
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js"); 
const {isLoggedIn,isOwner,ValidateListing}=require("../middleware.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage })

 
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),ValidateListing,wrapAsync(listingController.newListing));

router.get("/new",isLoggedIn,listingController.renderNewForm);

router.get("/search",listingController.Search);
router.get(
    "/category/:category",
    wrapAsync(listingController.filterByCategory)
);
router.post("/wishlist/:id",isLoggedIn,listingController.wishlist );
router.get("/wishlist",isLoggedIn, listingController.renderwishlist);
router.delete(
  "/wishlist/:id",
  isLoggedIn,
  listingController.removeWishlist
);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),ValidateListing,wrapAsync(listingController.listingUpdate))
.delete(isLoggedIn, isOwner,wrapAsync(listingController.listingDeleted));

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editFormRender));

module.exports=router;
