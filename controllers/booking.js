const Booking = require("../models/booking");
const Listing = require("../models/listing");
const PDFDocument = require("pdfkit");


module.exports.renderBookingForm = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Hotel not found!");
        return res.redirect("/listings");
    }

    res.render("bookings/new.ejs", { listing });
};

module.exports.createBooking = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id);

    const booking = new Booking(req.body.booking);

    booking.listing = listing._id;

    booking.user = req.user._id;

    const existingBooking = await Booking.findOne({
    listing: listing._id,
    status: "Booked",
    checkIn: { $lt: req.body.booking.checkOut },
    checkOut: { $gt: req.body.booking.checkIn }
});

if (existingBooking) {
    req.flash(
        "error",
        "Hotel is not available for the selected dates."
    );

    return res.redirect("/bookings/new/" + listing._id);
}

booking.bookingId =
"BK-" +
Date.now().toString().slice(-6) +
Math.floor(Math.random()*1000);

    await booking.save();

    req.flash("success", "Hotel booked successfully!");

    res.redirect("/listings/" + id);

};

module.exports.myBookings = async (req, res) => {

    const bookings = await Booking.find({
        user: req.user._id
    }).populate("listing");

    res.render("bookings/index.ejs", {
        bookings
    });

};

module.exports.cancelBooking = async (req, res) => {

    const { bookingId } = req.params;

    await Booking.findByIdAndUpdate(
        bookingId,
        {
            status: "Cancelled"
        }
    );

    req.flash("success", "Booking Cancelled!");

    res.redirect("/bookings");

};

module.exports.showBooking = async (req, res) => {

    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId)
        .populate("listing")
        .populate("user");

    if (!booking) {
        req.flash("error", "Booking not found");
        return res.redirect("/bookings");
    }

    res.render("bookings/show.ejs", { booking });

};

module.exports.downloadReceipt = async (req, res) => {

    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId)
        .populate("listing");

    if (!booking) {
        req.flash("error", "Booking not found");
        return res.redirect("/bookings");
    }

    const nights =
        Math.ceil(
            (booking.checkOut - booking.checkIn) /
            (1000 * 60 * 60 * 24)
        );

    const total =
        booking.listing.price * nights;

    const doc = new PDFDocument();

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${booking.bookingId}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(22)
        .text("TravelStay Booking Receipt", {
            align: "center"
        });

    doc.moveDown();

    doc.fontSize(14);

    doc.text(`Booking ID : ${booking.bookingId}`);

    doc.text(`Hotel : ${booking.listing.title}`);

    doc.text(`Guest : ${booking.name}`);

    doc.text(`Email : ${booking.email}`);

    doc.text(`Phone : ${booking.phone}`);

    doc.text(`Guests : ${booking.guests}`);

    doc.text(`Check In : ${booking.checkIn.toDateString()}`);

    doc.text(`Check Out : ${booking.checkOut.toDateString()}`);

    doc.text(`Price / Night : ₹${booking.listing.price}`);

    doc.text(`Total Nights : ${nights}`);

    doc.text(`Total Amount : ₹${total}`);

    doc.moveDown();

    if (booking.status === "Booked") {

    doc
        .fontSize(18)
        .fillColor("green")
        .text("Booking Confirmed");

} else {

    doc
        .fontSize(18)
        .fillColor("red")
        .text("Booking Cancelled");

}
    doc.end();

};