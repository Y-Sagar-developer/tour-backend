const Tour = require('../models/Tour.js');
const Review = require("../models/Review");
const mongoose = require('mongoose');
const tours = require("../data/tours");

//create new tour
const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
};

//update tour
const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    ).populate({
      path: 'reviews',
      select: 'username rating reviewText createdAt'
    });
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

//delete tour
const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

// Seed initial tours
const seedTours = async () => {
  try {
    // Check if tours already exist
    const existingTours = await Tour.find({});
    if (existingTours.length === 0) {
      console.log('Seeding initial tours...');
      const tourData = tours.map(tour => ({
        id: tour.id,
        title: tour.title,
        city: tour.city,
        address: tour.address,
        distance: tour.distance,
        price: tour.price,
        maxGroupSize: tour.maxGroupSize,
        desc: tour.desc,
        photo: tour.photo,
        featured: tour.featured || false,
        reviews: []
      }));
      await Tour.insertMany(tourData);
      console.log('Tours seeded successfully');
    }
  } catch (err) {
    console.error('Error seeding tours:', err);
  }
};

// Call seedTours when the server starts
seedTours();

//getSingle tour
const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    // Try to find tour by ID (either MongoDB _id or local id)
    let tour;
    if (mongoose.Types.ObjectId.isValid(id)) {
      tour = await Tour.findById(id).populate({
        path: 'reviews',
        model: 'Review',
        select: 'username reviewText rating createdAt _id productId'
      });
    } else {
      tour = await Tour.findOne({ id: id }).populate({
        path: 'reviews',
        model: 'Review',
        select: 'username reviewText rating createdAt _id productId'
      });
    }

    if (!tour) {
      console.log('Tour not found:', id);
      return res.status(404).json({
        success: false,
        message: "Tour not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Successful",
      data: tour,
    });
  } catch (err) {
    console.error("Error fetching tour:", err);
    res.status(404).json({
      success: false,
      message: "Not found",
      error: err.message
    });
  }
};

//getAll tour
const getAllTour = async (req, res) => {
  //for pagination
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({})
      .populate({
        path: 'reviews',
        select: 'username rating reviewText createdAt'
      })
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

//get tour by search
const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate({
      path: 'reviews',
      select: 'username rating reviewText createdAt'
    });

    res.status(200).json({
      success: true,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

//get featured tour
const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate({
        path: 'reviews',
        select: 'username rating reviewText createdAt'
      })
      .limit(8);
    res.status(200).json({
      success: true,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

//get tour counts
const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      data: tourCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch",
    });
  }
};

module.exports = {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
};
