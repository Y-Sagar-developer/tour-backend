const mongoose = require('mongoose');
const Review = require('../models/Review');

async function dropReviews() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/tours_booking', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Drop the reviews collection
    await Review.collection.drop();
    console.log('Dropped reviews collection');

    console.log('Reviews collection dropped successfully');
  } catch (error) {
    console.error('Error dropping reviews:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

dropReviews(); 