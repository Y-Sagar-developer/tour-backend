const Booking = require("../models/Booking.js");

//create new booking
const createBooking = async (req, res)=>{
    try {
        console.log('Creating booking with data:', {
            body: req.body,
            user: req.user,
            headers: req.headers
        });

        // Get user ID from the token
        const tokenUserId = req.user.id;
        console.log('Token user ID:', tokenUserId);

        // Create a new booking with the user ID from the token
        const newBooking = new Booking({
            ...req.body,
            userId: tokenUserId // Use the user ID from the token
        });

        const savedBooking = await newBooking.save();
        console.log("Successfully saved booking:", savedBooking);

        res.status(200)
        .json({
            success: true,
            message: "Your tour is booked",
            data: savedBooking,
        });

    } catch (err) {
        console.error('Booking creation error:', err);
        // Check for specific MongoDB validation errors
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: Object.values(err.errors).map(e => e.message)
            });
        }

        res.status(500).json({
            success: false, 
            message: "Internal server error",
            error: err.message
        });
    }
}

//get single booking
const getBooking = async(req, res)=>{
    const id = req.params.id

    try {
        const book = await Booking.findById(id)
        res.status(200)
        .json({
            success:true,
            message:"successful",
            data:book,
        });
    }
    catch(err){
        res.status(404).json({success:true, message:"not found"})

    }
}

//get all  booking
const getAllBooking = async(req, res)=>{

    try {
        const books = await Booking.find()
        res.status(200)
        .json({
            success:true,
            message:"successful",
            data:books,
        });
    }
    catch(err){
        res.status(500).json({success:true, message:"internal server error"})

    }
}

//delete booking
const deleteBooking = async(req, res)=>{
    const id = req.params.id;

    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Booking deleted successfully"
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}

module.exports = {
    createBooking,
    getBooking,
    getAllBooking,
    deleteBooking
};