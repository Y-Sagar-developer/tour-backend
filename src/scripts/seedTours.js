const mongoose = require('mongoose');
const Tour = require('../models/Tour');
const tours = require('../data/tours');

async function seedTours() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/tours_booking', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // First, check if tours already exist
    const existingTours = await Tour.find({});
    if (existingTours.length > 0) {
      console.log('Tours already exist in database');
      await Tour.deleteMany({}); // Delete existing tours
      console.log('Deleted existing tours');
    }

    // Prepare tour data
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

    // Insert tours
    await Tour.insertMany(tourData);
    console.log('Tours seeded successfully');

  } catch (error) {
    console.error('Error seeding tours:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedTours(); 