import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;