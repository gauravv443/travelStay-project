const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },

    bookingId: {
    type: String,
    unique: true,
    required: true
},

    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    name: {
        type: String,
        required: true,
    },


    email: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    checkIn: {
        type: Date,
        required: true,
    },

    checkOut: {
        type: Date,
        required: true,
    },

    guests: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: ["Booked", "Cancelled"],
        default: "Booked",
    },
},{
    timestamps:true,
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;