const mongoose = require('mongoose');
const Tour = require('../models/Tour');

async function dropIndexes() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/tours_booking', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Drop the unique index on the title field
    await Tour.collection.dropIndex('title_1');
    console.log('Dropped unique index on title field');

    // Create a new non-unique index on title
    await Tour.collection.createIndex({ title: 1 }, { unique: false });
    console.log('Created non-unique index on title field');

    console.log('Indexes updated successfully');
  } catch (error) {
    console.error('Error updating indexes:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

dropIndexes(); 