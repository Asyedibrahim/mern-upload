import Listing from "../models/listing.model.js";

export const uploadFile = async (req, res) => {
    const { uname, email, address } = req.body;
    const file = req.file ? req.file.filename : null;

    try {
        const newListing = new Listing({ uname, email, address, file });
        
        await newListing.save();
        res.status(201).json({ message: 'Listing created successfully', newListing })

    } catch (error) {
        res.status(400).json({ message: 'Error creating listing', error });
    }
};

export const getListings = async (req, res) => {
    try {
        const getLists = await Listing.find();
        res.status(201).json(getLists);

    } catch (error) {
        res.status(400).json({ message: 'Error show listing', error });
    }
};

export const deleteList = async (req, res) => {
    try {
        if (!req.params.listId) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        await Listing.findByIdAndDelete(req.params.listId);
        res.status(200).json({ message: 'Listing deleted successfully', deleteList });

    } catch (error) {
        res.status(400).json({ message: 'Error delete listing', error });
    }
}