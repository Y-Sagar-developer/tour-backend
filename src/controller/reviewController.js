const Tour = require("../models/Tour");
const Review = require("../models/Review");
const mongoose = require('mongoose');
const tours = require("../data/tours");

const createReview = async (req, res) => {
  const tourId = req.params.id;
  try {
    console.log('Creating review for tour:', tourId);
    console.log('Request body:', req.body);

    // Validate required fields
    if (!req.body.username || !req.body.reviewText || !req.body.rating) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        requiredFields: ['username', 'reviewText', 'rating']
      });
    }

    // Try to find tour by ID (either MongoDB _id or local id)
    let tour;
    
    // First try to find by MongoDB _id
    if (mongoose.Types.ObjectId.isValid(tourId)) {
      tour = await Tour.findById(tourId);
    }
    
    // If not found, try to find by local id
    if (!tour) {
      tour = await Tour.findOne({ id: tourId });
      console.log('Found tour by local id:', tour);
    }

    // If still not found, try to find by title
    if (!tour && req.body.tourTitle) {
      tour = await Tour.findOne({ title: req.body.tourTitle });
      console.log('Found tour by title:', tour);
    }

    // If still not found, try to find any existing tour
    if (!tour) {
      tour = await Tour.findOne({});
      console.log('Found any existing tour:', tour);
    }

    if (!tour) {
      console.log('No tour found in database');
      return res.status(404).json({
        success: false,
        message: "No tour found in database"
      });
    }

    // Create new review with tour ID
    const newReview = new Review({
      productId: tour._id,
      username: req.body.username,
      reviewText: req.body.reviewText,
      rating: req.body.rating
    });

    console.log('Creating review with data:', {
      username: req.body.username,
      reviewText: req.body.reviewText,
      rating: req.body.rating,
      tourId: tour._id
    });

    const savedReview = await newReview.save();
    console.log('Review saved successfully:', savedReview);

    // Update the tour's reviews array
    await Tour.findByIdAndUpdate(tour._id, {
      $push: { reviews: savedReview._id }
    });
    console.log('Tour updated with new review');

    // Fetch the saved review with all fields
    const populatedReview = await Review.findById(savedReview._id);
    console.log('Populated review:', populatedReview);

    res.status(200).json({
      success: true,
      message: "Review submitted successfully",
      data: populatedReview
    });
  } catch (err) {
    console.error("Review submission error:", err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(err.errors).map(e => e.message)
      });
    }

    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid tour ID format"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit review",
      error: err.message
    });
  }
};

module.exports = {
  createReview
}; 