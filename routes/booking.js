const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");

router.get(
    "/new/:id",
    isLoggedIn,
    wrapAsync(bookingController.renderBookingForm)
);

router.post(
    "/:id",
    isLoggedIn,
    wrapAsync(bookingController.createBooking)
);

router.get(
    "/",
    isLoggedIn,
    wrapAsync(bookingController.myBookings)
);

router.put(
    "/:bookingId/cancel",
    isLoggedIn,
    wrapAsync(bookingController.cancelBooking)
);

router.get(
    "/:bookingId",
    isLoggedIn,
    wrapAsync(bookingController.showBooking)
);

router.get(
    "/:bookingId/receipt",
    isLoggedIn,
    wrapAsync(bookingController.downloadReceipt)
);

module.exports = router;